ALTER TABLE "books" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "author" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "year" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;