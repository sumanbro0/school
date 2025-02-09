CREATE TYPE "public"."content_type" AS ENUM('blog', 'activity');--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN "content_type" "content_type" DEFAULT 'blog';