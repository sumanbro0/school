import { pgTable, integer, varchar, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const testimonial = pgTable("testimonial", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  name: varchar("name").notNull(),
  position: varchar("position").notNull(),
  company: varchar("company"),
  content: text("content").notNull(),
  avatarUrl: varchar("avatar_url"),
});

export const insertTestimonialSchema = createInsertSchema(testimonial);
export const selectTestimonialSchema = createSelectSchema(testimonial);

export type InsertTestimonialType = z.infer<typeof insertTestimonialSchema>;
export type TestimonialType = z.infer<typeof selectTestimonialSchema>;