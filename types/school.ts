import { insertAdmissionSchema, selectAdmissionSchema } from "@/db/schemas/admission"
import { selectSchoolSchema,insertSchoolSchema } from "@/db/schemas/school"
import { z } from "zod"

export type InsertSchool=z.infer<typeof insertSchoolSchema>
export type School=z.infer<typeof selectSchoolSchema>

export type insertAdmission=z.infer<typeof insertAdmissionSchema>
export type Admission=z.infer<typeof selectAdmissionSchema>