CREATE TABLE "highlight" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "highlight_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1),
	"backgroundImage" varchar NOT NULL,
	"title" varchar NOT NULL,
	"subTitle" varchar,
	"descreption" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "image_gallery" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "image_gallery_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1),
	"title" varchar NOT NULL,
	"subTitle" varchar,
	"imageUrl" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_gallery" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "video_gallery_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1),
	"title" varchar NOT NULL,
	"subTitle" varchar,
	"videoUrl" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "welcome" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "welcome_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1),
	"backgroundImage" varchar NOT NULL,
	"title" varchar NOT NULL,
	"subTitle" varchar,
	"descreption" varchar NOT NULL
);
