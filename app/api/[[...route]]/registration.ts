import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator'
import { admission, insertAdmissionSchema } from "@/db/schemas/admission"
import {clerkMiddleware,getAuth} from "@hono/clerk-auth"
import { z } from "zod"
import { db } from "@/db"
import { eq } from "drizzle-orm"

const app = new Hono()
    .get('/',
        clerkMiddleware(),
        zValidator(
            "query",
            z.object({
                page: z.coerce.number().optional(),
            })
        ),
        async (c) => {
            const pageSize=5
            const page=c.req.valid("query").page || 1
              const auth = getAuth(c)
                if (!auth?.userId) {
                    return c.json({
                    message: 'You are not logged in.',
                    },400)
                }
                const admissions=await db.select().from(admission).limit(pageSize).offset(pageSize*(page-1))
                const total=await db.$count(admission);
                const hasNextPage=total>pageSize*page
                const hasPreviousPage=page>1
                return c.json(
                    {admissions,total:total,hasNextPage,hasPreviousPage},200
                )
    })
    .get('/:id',
        clerkMiddleware(),
        zValidator(
            "param",
            z.object({
                id: z.coerce.number(),
            })
        ),
        async (c) => {
            const id=c.req.valid("param").id || 1
              
                const admissions=await db.select().from(admission).where(eq(admission.id,id)).limit(1)
               
                return c.json(
                    admissions,200
                )
    })
    .post('/',
        zValidator(
        'json',
        insertAdmissionSchema
        ),
        async (c) => {
        const values=c.req.valid("json")
        try {
            await db.insert(admission).values(values)
            return c.json({
                    message: 'Submitted successfully',
            },200)
            
        } catch (error) {
            console.log("ADMISSION ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })



export default app