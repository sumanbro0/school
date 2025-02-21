import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator'
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { insertPageSchema, page, selectPageSchema } from "@/db/schemas/pages"

const app = new Hono()
    .get('/',
    async (c) => {

            const pages=await db.select().from(page).orderBy(page.parent)
            
            return c.json(
                {data:pages},200
            )
    })
    .get('/edit/:id',
        zValidator("param",z.object({
            id:z.coerce.number()
        })),
    async (c) => {
            const id=c.req.valid("param").id
            const [pages]=await db.select().from(page).where(eq(page.id,id)).limit(1)
            
            return c.json(
                {data:pages},200
            )
    })
    .get('/:slug',
    zValidator(
        "param",
        z.object({
            slug: z.string()
        })),
        async (c) => {
            const {slug}=c.req.valid("param")
            if (!slug) {
                return c.json({
                    message: "Invalid slug",
                }, 400)
            }
            
            const pagesData=await db.select().from(page).where(eq(page.pageSlug,slug))
            return c.json(
                {data:pagesData},200
            )
    })
    .post('/',
        zValidator(
        'json',
        insertPageSchema
        ),
        async (c) => {
        const values=c.req.valid("json")
        try {
            await db.insert(page).values(values)
            return c.json({
                    message: 'Submitted successfully',
            },200)
            
        } catch (error) {
            console.log("BLOG ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    })
    .put("/",
    zValidator(
        "json",
        selectPageSchema

    ),
    async (c) => {
        const values = c.req.valid("json")
        const {id, ...rest} = values
        try {
            await db.update(page).set(rest).where(eq(page.id, id))
            return c.json({
                message: "Updated successfully",
            }, 200)
        } catch (error) {
            console.log("BLOG ERROR", error)
            return c.json({
                message: "An error occurred",
            }, 400)
        }
    })
        



export default app