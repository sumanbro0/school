CREATE TABLE "enquiry" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "enquiry_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1),
	"studentName" varchar(255) NOT NULL,
	"grade" varchar(255) NOT NULL,
	"parentName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"preferredLocation" varchar(255) NOT NULL
);
