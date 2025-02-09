import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
export const contentTypeEnum = pgEnum('content_type', ['blog', 'activity']);

export const blog = pgTable("blog", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  title: varchar({ length: 255 }).notNull(),
  excerpt: varchar({ length: 255 }).notNull(),
  description: varchar().notNull(),
  category: varchar({ length: 255 }),
  tags: varchar({ length: 255 }),
  image: varchar(),
  contentTypeEnum: contentTypeEnum("content_type").default("blog"),
});

export const category = pgTable("category", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
    name: varchar({ length: 255 }).notNull(),
    });


export const insertBlogSchema=createInsertSchema(blog);
export const selectBlogSchema=createSelectSchema(blog);

export const insertCategorySchema=createInsertSchema(category);
export const selectCategorySchema=createSelectSchema(category);


