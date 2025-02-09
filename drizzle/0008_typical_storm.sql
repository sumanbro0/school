CREATE TABLE "fee_structure" (
	"id" serial PRIMARY KEY NOT NULL,
	"grade" varchar(255) NOT NULL,
	"image" varchar(255) NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fees" (
	"id" serial PRIMARY KEY NOT NULL,
	"fee_structure_id" integer NOT NULL,
	"type" varchar(255) NOT NULL,
	"amount" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "fees" ADD CONSTRAINT "fees_fee_structure_id_fee_structure_id_fk" FOREIGN KEY ("fee_structure_id") REFERENCES "public"."fee_structure"("id") ON DELETE no action ON UPDATE no action;