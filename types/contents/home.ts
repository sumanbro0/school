import { insertHeroSchema, insertHighlightSchema, insertImageGallerySchema, insertVideoGallerySchema, insertWelcomeSchema, selectHeroSchema, selectHighlightSchema, selectImageGallerySchema, selectVideoGallerySchema, selectWelcomeSchema } from "@/db/schemas/home-content";
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