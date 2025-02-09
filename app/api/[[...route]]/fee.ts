import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator';

import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { fees, feeStructure, insertFeeStructureWithFeesSchema } from "@/db/schemas/fee";


const app = new Hono()
.get('/', async (c) => {
  try {
    const rows = await db.select({
      feeStructure: feeStructure,
      fee: fees,
    })
    .from(feeStructure)
    .leftJoin(fees, eq(feeStructure.id, fees.feeStructureId))

    const result = rows.reduce<Record<number, { feeStructure: typeof feeStructure.$inferSelect; fees: typeof fees.$inferSelect[] }>>(
      (acc, row) => {
        const fs = row.feeStructure;
        const fee = row.fee;
        if (!acc[fs.id]) {
          acc[fs.id] = { feeStructure: fs, fees: [] };
        }
        if (fee) {
          acc[fs.id].fees.push(fee);
        }
        return acc;
      },
      {}
    );

    const feeStructuresWithFees = Object.values(result);
    return c.json({
      feeStructures: feeStructuresWithFees
    }, 200);
  } catch (error) {
    console.error("FEE STRUCTURES FETCH ERROR", error);
    return c.json({ message: 'An error occurred while fetching fee structures' }, 500);
  }
})
.post('/',
    clerkMiddleware(),
  zValidator('json', insertFeeStructureWithFeesSchema),
  async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ message: 'You are not logged in.' }, 401);
    }

    const values = c.req.valid("json");

    try {
      const result = await db.transaction(async (tx) => {
        const [insertedFeeStructure] = await tx.insert(feeStructure).values({
          grade: values.grade,
          image: values.image,
          description: values.description,
        }).returning();

        if (values.fees.length > 0) {
          await tx.insert(fees).values(
            values.fees.map(fee => ({
              ...fee,
              feeStructureId: insertedFeeStructure.id
            }))
          );
        }

        return insertedFeeStructure;
      });

      return c.json({
        message: 'Fee structure created successfully',
        feeStructure: result
      }, 201);
    } catch (error) {
      console.error("FEE STRUCTURE CREATION ERROR", error);
      return c.json({ message: 'An error occurred while creating the fee structure' }, 500);
    }
  }
)
.put('/',
  zValidator('json', insertFeeStructureWithFeesSchema),
  async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ message: 'You are not logged in.' }, 401);
    }

    
    const {id,...values} = c.req.valid("json");

    console.log(values, id);

    if (!id) {
      return c.json({ message: 'Fee structure ID is required' }, 400);
    }

    try {
      const result = await db.transaction(async (tx) => {
        // Update fee structure
        const [updatedFeeStructure] = await tx.update(feeStructure)
          .set({
            grade: values.grade,
            image: values.image,
            description: values.description,
          })
          .where(eq(feeStructure.id, id))
          .returning();

        if (!updatedFeeStructure) {
          console.log("FEE STRUCTURE NOT FOUND");
          throw new Error('Fee structure not found');
        }

        // Delete existing fees
        await tx.delete(fees).where(eq(fees.feeStructureId, updatedFeeStructure.id));

        // Insert new fees
        if (values.fees.length > 0) {
          await tx.insert(fees).values(
            values.fees.map(fee => ({
              ...fee,
              feeStructureId: updatedFeeStructure.id
            }))
          );
        }

        return updatedFeeStructure;
      });

      return c.json({
        message: 'Fee structure updated successfully',
        feeStructure: result
      }, 200);
    } catch (error) {
      console.error("FEE STRUCTURE UPDATE ERROR", error);
      if (error instanceof Error && error.message === 'Fee structure not found') {
        return c.json({ message: 'Fee structure not found' }, 404);
      }
      return c.json({ message: 'An error occurred while updating the fee structure' }, 500);
    }
  }
);

export default app;