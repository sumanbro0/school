CREATE TABLE "popup" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "popup_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1),
	"title" varchar NOT NULL,
	"subTitle" varchar,
	"descreption" varchar NOT NULL,
	"image" varchar NOT NULL,
	"buttonText" varchar NOT NULL,
	"href" varchar NOT NULL,
	"isActive" boolean DEFAULT true
);
--> statement-breakpoint
ALTER TABLE "public"."page" ALTER COLUMN "parent" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."parent_type";--> statement-breakpoint
CREATE TYPE "public"."parent_type" AS ENUM('about', 'admission', 'members', 'academics', 'facilities', 'beyond-academics', 'co-curricular', 'gallery', 'alumni');--> statement-breakpoint
ALTER TABLE "public"."page" ALTER COLUMN "parent" SET DATA TYPE "public"."parent_type" USING "parent"::"public"."parent_type";