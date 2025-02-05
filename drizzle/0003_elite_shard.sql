CREATE TABLE "hero" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hero_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1),
	"backgroundImage" varchar NOT NULL,
	"title" varchar NOT NULL,
	"subTitle" varchar NOT NULL,
	"buttonText" varchar NOT NULL,
	"preferredLocation" varchar(255) NOT NULL
);
