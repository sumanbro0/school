import { timestamp, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const school = pgTable("school", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  name: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  logo: varchar({ length: 255 }).notNull(),
  logoLabel: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(()=>new Date()).notNull(),
});

export const insertSchoolSchema=createInsertSchema(school);
export const selectSchoolSchema=createSelectSchema(school);

// export const insertSchoolSchema=createInsertSchema(school,{
//   createdAt:z.union([z.string(),z.date()]).optional(),
//   updatedAt:z.union([z.string(),z.date()]).optional(),
// });
// export const selectSchoolSchema=createSelectSchema(school,{
//   createdAt:z.union([z.string(),z.date()]).optional(),
//   updatedAt:z.union([z.string(),z.date()]).optional(),
// });


