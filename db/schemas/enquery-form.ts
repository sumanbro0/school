import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const enquiry = pgTable("enquiry", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  studentName: varchar({ length: 255 }).notNull(),
  grade: varchar({ length: 255 }).notNull(),
  parentName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  preferredLocation: varchar({ length: 255 }).notNull(),
});


export const insertEnquirySchema=createInsertSchema(enquiry);
export const selectEnquirySchema=createSelectSchema(enquiry);


