import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const hero = pgTable("hero", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  backgroundImage: varchar().notNull(),
    title: varchar().notNull(),
    subTitle: varchar(),
    buttonText: varchar().notNull(),
});


export const insertHeroSchema=createInsertSchema(hero);
export const selectHeroSchema=createSelectSchema(hero);



export const welcome = pgTable("welcome", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  backgroundImage: varchar().notNull(),
  title: varchar().notNull(),
  subTitle: varchar(),
  descreption: varchar().notNull(),
});

export const insertWelcomeSchema=createInsertSchema(welcome);
export const selectWelcomeSchema=createSelectSchema(welcome);

export const highlight = pgTable("highlight", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  backgroundImage: varchar().notNull(),
  title: varchar().notNull(),
  subTitle: varchar(),
  descreption: varchar().notNull(),
});

export const insertHighlightSchema=createInsertSchema(highlight);
export const selectHighlightSchema=createSelectSchema(highlight);

export const videoGallery = pgTable("video_gallery", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  title: varchar().notNull(),
  subTitle: varchar(),
  videoUrl: varchar().notNull(),
});

export const insertVideoGallerySchema=createInsertSchema(videoGallery);
export const selectVideoGallerySchema=createSelectSchema(videoGallery);

export const imageGallery = pgTable("image_gallery", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  title: varchar().notNull(),
  subTitle: varchar(),
  imageUrl: varchar().notNull(),
});

export const insertImageGallerySchema=createInsertSchema(imageGallery);
export const selectImageGallerySchema=createSelectSchema(imageGallery);