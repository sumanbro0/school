import { db } from "@/db"
import { Hono } from "hono"

const app = new Hono()
    .get('/',async (c) => {
        const u=await db.query.usersTable.findFirst()
        console.log(u)
        return c.json({
            message: 'Hello Next.js!',
        })
    })




export default app