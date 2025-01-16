import { selectSchoolSchema,insertSchoolSchema } from "@/db/schemas/school"
import { z } from "zod"

export type InsertSchool=z.infer<typeof insertSchoolSchema>
export type School=z.infer<typeof selectSchoolSchema>