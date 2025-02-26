import { db } from "@/db"
import { admission } from "@/db/schemas/admission"
import { school as sc } from "@/db/schemas/school"
import { eq } from "drizzle-orm"

export const getSchool = async () => {
    try {
        const [school]=await db.select().from(sc).limit(1)
        return school
        
    } catch (error) {
        console.error(error)
        return null
    }
}
export const getRegistrationDetail = async (id:number) => {
    try {
        const [reg]=await db.select().from(admission).where(eq(admission.id,id)).limit(1)
        return reg
        
    } catch (error) {
        console.error(error)
        return null
    }
}