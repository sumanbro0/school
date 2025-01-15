import { insertEnquirySchema, selectEnquirySchema } from "@/db/schemas/enquery-form"
import { z } from "zod"

export type InsertEnquery=z.infer<typeof insertEnquirySchema>
export type Enquiry=z.infer<typeof selectEnquirySchema>