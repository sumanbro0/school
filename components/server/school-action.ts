'use server';

import { db } from "@/db";
import { school } from "@/db/schemas/school";

export async function getSchoolInfo(){
    try {
        const [data]=await db.select().from(school).limit(1)
        return {data, message: 'School Info fetched successfully'}
        
    } catch (error) {
        console.log("School Action ERROR",error)
        return {
            message: 'An error occurred',data:null
        }
        
    }
}