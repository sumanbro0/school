import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator'
import { db } from "@/db"
import { blog, category, contentTypeEnum, insertBlogSchema, insertCategorySchema, selectBlogSchema } from "@/db/schemas/blogs"
import { eq } from "drizzle-orm"
import { z } from "zod"

const app = new Hono()
    .get('/',
        zValidator("query",
            z.object({
            type:z.enum(contentTypeEnum.enumValues).optional()
        }),
    ),
    async (c) => {
        const query=c.req.valid("query")

            const blogs=await db.select().from(blog).where(eq(blog.contentTypeEnum,(query.type || "blog")))
            return c.json(
                {data:blogs},200
            )
    })
    
    .get('/categories',
        async (c) => {
    
            const categories=await db.select().from(category)
            return c.json(
                {data:categories},200
            )
    })
    .get('/:id',
    zValidator(
        "param",
        z.object({
            id: z.coerce.number()
        })),
    async (c) => {
            const param=c.req.valid("param")
            const [blogs]=await db.select().from(blog).where(eq(blog.id,param.id))
            return c.json(
                {data:blogs},200
            )
    })
    .post('/',
        zValidator(
        'json',
        insertBlogSchema
        ),
        async (c) => {
        const values=c.req.valid("json")
        try {
            await db.insert(blog).values(values)
            return c.json({
                    message: 'Submitted successfully',
            },200)
            
        } catch (error) {
            console.log("BLOG ERROR",error)
            return c.json({
                message: 'An error occurred',
            },400)
        }
       
    }).
    post('/categories',
        zValidator(
        'json',
        insertCategorySchema
        ),
        async (c) => {
        const values=c.req.valid("json")
        try {
            await db.insert(category).values(values)
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
        selectBlogSchema

    ),
    async (c) => {
        const values = c.req.valid("json")
        const {id, ...rest} = values
        try {
            await db.update(blog).set(rest).where(eq(blog.id, id))
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