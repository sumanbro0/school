import { insertBlogSchema, insertCategorySchema, selectBlogSchema, selectCategorySchema } from "@/db/schemas/blogs";
import { insertFeeStructureWithFeesSchema, selectFeeStructureWithFeesSchema } from "@/db/schemas/fee";

import { insertHeroSchema, insertHighlightSchema, insertImageGallerySchema, insertPopupSchema, insertVideoGallerySchema, insertWelcomeSchema, selectHeroSchema, selectHighlightSchema, selectImageGallerySchema, selectPopupSchema, selectVideoGallerySchema, selectWelcomeSchema } from "@/db/schemas/home-content";
import { insertPageSchema, selectPageSchema } from "@/db/schemas/pages";
import { z } from "zod";

export type InsertHeroType=z.infer<typeof insertHeroSchema>;
export type HeroType=z.infer<typeof selectHeroSchema>;

export type InsertWelcomeType=z.infer<typeof insertWelcomeSchema>;
export type WelcomeType=z.infer<typeof selectWelcomeSchema>;

export type InsertHighlightType=z.infer<typeof insertHighlightSchema>;
export type HighlightType=z.infer<typeof selectHighlightSchema>;

export type InsertVideoGalleryType=z.infer<typeof insertVideoGallerySchema>;
export type VideoGalleryType=z.infer<typeof selectVideoGallerySchema>;

export type InsertImageGalleryType=z.infer<typeof insertImageGallerySchema>;
export type ImageGalleryType=z.infer<typeof selectImageGallerySchema>;

export type InsertCategoryType=z.infer<typeof insertCategorySchema>;
export type CategoryType=z.infer<typeof selectCategorySchema>;

export type InsertBlogType=z.infer<typeof insertBlogSchema>;
export type BlogType=z.infer<typeof selectBlogSchema>;


export type InsertFeeStructureWithFees = z.infer<typeof insertFeeStructureWithFeesSchema>;
export type SelectFeeStructureWithFees = z.infer<typeof selectFeeStructureWithFeesSchema>;

export type InsertPageType=z.infer<typeof insertPageSchema>;
export type PageType=z.infer<typeof selectPageSchema>;



export type PopupType=z.infer<typeof selectPopupSchema>;
export type InsertPopupType=z.infer<typeof insertPopupSchema>;



export type CardData = {
  id: number | string;
  title: string;
  excerpt?: string;
  content?: string;
  imageUrl?: string;
  date?: string;
  author?: string;
  category?: string;
  tags?: string[];
  slug: string;
};