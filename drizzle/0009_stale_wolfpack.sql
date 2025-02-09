CREATE TABLE "testimonial" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "testimonial_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1),
	"name" varchar NOT NULL,
	"position" varchar NOT NULL,
	"company" varchar,
	"content" text NOT NULL,
	"avatar_url" varchar
);
