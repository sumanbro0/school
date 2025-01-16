import { db } from "@/db"
import { school as sc } from "@/db/schemas/school"

export const getSchool = async () => {
    try {
        const [school]=await db.select().from(sc).limit(1)
        return school
        
    } catch (error) {
        console.error(error)
        return null
    }
}