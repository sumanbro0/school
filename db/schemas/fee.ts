import { pgTable, serial, varchar, integer, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const feeStructure = pgTable("fee_structure", {
  id: serial("id").primaryKey(),
  grade: varchar("grade", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  description: text("description").notNull(),
});

export const feeStructureRelations = relations(feeStructure, ({ many }) => ({
  fees: many(fees),
}));

export const fees = pgTable("fees", {
  id: serial("id").primaryKey(),
  feeStructureId: integer("fee_structure_id").notNull().references(() => feeStructure.id),
  type: varchar("type", { length: 255 }).notNull(),
  amount: varchar("amount", { length: 255 }).notNull(),
});

export const feesRelations = relations(fees, ({ one }) => ({
  feeStructure: one(feeStructure, {
    fields: [fees.feeStructureId],
    references: [feeStructure.id],
  }),
}));

const insertFeeStructureSchema = createInsertSchema(feeStructure);
const insertFeesSchema = createInsertSchema(fees);
const selectFeeStructureSchema = createSelectSchema(feeStructure);
const selectFeesSchema = createSelectSchema(fees);

// Export only the schemas we need for insert and select operations
export const insertFeeStructureWithFeesSchema = insertFeeStructureSchema.extend({
  fees: z.array(insertFeesSchema.omit({ id: true, feeStructureId: true })),
});

export const selectFeeStructureWithFeesSchema = selectFeeStructureSchema.extend({
  fees: z.array(selectFeesSchema),
});