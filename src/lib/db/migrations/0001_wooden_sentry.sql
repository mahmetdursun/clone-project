ALTER TABLE "master_products" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "master_products_slug_idx" ON "master_products" USING btree ("slug");