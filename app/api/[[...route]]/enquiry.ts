import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator'
import { enquiry, insertEnquirySchema } from "@/db/schemas/enquery-form"
import {clerkMiddleware,getAuth} from "@hono/clerk-auth"
import { z } from "zod"
import { db } from "@/db"

const app = new Hono()
    .get('/',
        clerkMiddleware(),
        zValidator(
            "param",
            z.object({
                page: z.number().optional(),
            })
        ),
        async (c) => {
            const page=c.req.valid("param").page || 1
              const auth = getAuth(c)
                if (!auth?.userId) {
                    return c.json({
                    message: 'You are not logged in.',
                    },400)
                }
                const enquiries=await db.select().from(enquiry).limit(10).offset(10*(page-1))
                const total=await db.$count(enquiry);
                const hasNextPage=total>10*page
                const hasPreviousPage=page>1
                return c.json(
                    {enquiries,total:total,hasNextPage,hasPreviousPage},200
                )
    })
    .post('/',
        zValidator(
        'json',
        insertEnquirySchema
        ),
        async (c) => {
        const values=c.req.valid("json")
        try {
            await db.insert(enquiry).values(values)
            return c.json({
                    message: 'Submitted successfully',
            },200)
            
        } catch (error) {
            console.log("ENQUIRY ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })



export default app