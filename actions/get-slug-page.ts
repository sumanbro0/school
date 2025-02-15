import { db } from "@/db"
import { page } from "@/db/schemas/pages"
import { eq } from "drizzle-orm"

export const getSlugPage = async (slug:string) => {
    try {
        const [school]=await db.select().from(page).where(eq(page.pageSlug,slug)).limit(1)
        return school
        
    } catch (error) {
        console.error(error)
        return null
    }
}
export const getPages = async () => {
    try {
        const pages=await db.select({
            pageSlug:page.pageSlug,
            title:page.title,
            parent:page.parent
        }).from(page)
        return pages
        
    } catch (error) {
        console.error(error)
        return null
    }
}