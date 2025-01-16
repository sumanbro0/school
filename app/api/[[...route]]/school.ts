import { Hono } from "hono"

import {clerkMiddleware} from "@hono/clerk-auth"
import { db } from "@/db"
import { insertSchoolSchema, school } from "@/db/schemas/school"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { eq } from "drizzle-orm"

const app = new Hono()
    .get('/',
        clerkMiddleware(),
        async (c) => {
              
                const [scl]=await db.select().from(school).limit(1)
  
                return c.json(
                    {scl:scl},200
                )
    })
    .post('/',
        zValidator(
        'json',
        insertSchoolSchema),
        async (c) => {
            try {
            const values=c.req.valid("json")
            await db.insert(school).values(values)
            return c.json({
                message:"School Created Successfully"
            },
            200)
        } catch (error) {
            console.log("ENQUIRY ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })
    .put('/:id',
        zValidator(
        'json',
        insertSchoolSchema),
        zValidator(
        'param',
        z.object({
            id:z.string()
        })),
        async (c) => {
            try {
            const values=c.req.valid("json")
            const id=c.req.valid("param").id

            await db.update(school).set(values).where(eq(school.id,parseInt(id)))
            return c.json({
                message:"School Updated Successfully"
            },
            200)
        } catch (error) {
            console.log("ENQUIRY ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })



export default app