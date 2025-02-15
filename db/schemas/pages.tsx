import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const parentEnums = [
  "about",
  "admission",
  "members",
  "academics",
  "facilities",
  "beyond-academics",
  "co-curricular",
  "gallery",
  "alumni",
] as const;

export type ParentEnumValuesType = (typeof parentEnums)[number];
export const parentEnum = pgEnum("parent_type", parentEnums);
export const page = pgTable("page", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  parent: parentEnum().notNull(),
  title: text().notNull(),
  content: text().notNull(),
  pageSlug: text().notNull(),
  banner: text().notNull(),
});

export const insertPageSchema = createInsertSchema(page);
export const selectPageSchema = createSelectSchema(page);
