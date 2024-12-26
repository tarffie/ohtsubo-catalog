CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '',
	"price" real DEFAULT 0,
	"status" integer DEFAULT 0,
	"quantity" integer DEFAULT 0
);
