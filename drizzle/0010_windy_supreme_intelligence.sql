CREATE TYPE "public"."parent_type" AS ENUM('home', 'about', 'admission', 'members', 'academics', 'facilities', 'beyond-academics', 'co-curricular', 'gallery', 'alumni', 'career', 'news', 'contact');--> statement-breakpoint
CREATE TABLE "page" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "page_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1),
	"parent" "parent_type" NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"pageSlug" text NOT NULL,
	"banner" text NOT NULL
);
