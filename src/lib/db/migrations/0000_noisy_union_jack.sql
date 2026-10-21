CREATE TYPE "public"."match_status" AS ENUM('unmatched', 'auto_matched', 'needs_review', 'manually_matched', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."review_queue_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "master_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"position" text,
	"vehicle_brand" text,
	"vehicle_model" text,
	"year_from" integer,
	"year_to" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "match_review_queue" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"supplier_product_id" uuid NOT NULL,
	"suggested_master_product_id" uuid,
	"reason" text NOT NULL,
	"confidence_score" numeric(5, 2),
	"status" "review_queue_status" DEFAULT 'pending' NOT NULL,
	"reviewed_by" text,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "oem_equivalences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"normalized_number_a" text NOT NULL,
	"normalized_number_b" text NOT NULL,
	"note" text,
	"confirmed_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "oem_numbers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"master_product_id" uuid NOT NULL,
	"raw_number" text NOT NULL,
	"normalized_number" text NOT NULL,
	"source" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "supplier_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"supplier_key" text NOT NULL,
	"supplier_sku" text NOT NULL,
	"raw_title" text NOT NULL,
	"brand" text,
	"price" numeric(12, 2),
	"currency" text DEFAULT 'TRY',
	"stock_quantity" integer,
	"raw_oem_numbers" text,
	"match_status" "match_status" DEFAULT 'unmatched' NOT NULL,
	"master_product_id" uuid,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_synced_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "match_review_queue" ADD CONSTRAINT "match_review_queue_supplier_product_id_supplier_products_id_fk" FOREIGN KEY ("supplier_product_id") REFERENCES "public"."supplier_products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_review_queue" ADD CONSTRAINT "match_review_queue_suggested_master_product_id_master_products_id_fk" FOREIGN KEY ("suggested_master_product_id") REFERENCES "public"."master_products"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oem_numbers" ADD CONSTRAINT "oem_numbers_master_product_id_master_products_id_fk" FOREIGN KEY ("master_product_id") REFERENCES "public"."master_products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplier_products" ADD CONSTRAINT "supplier_products_master_product_id_master_products_id_fk" FOREIGN KEY ("master_product_id") REFERENCES "public"."master_products"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "master_products_category_idx" ON "master_products" USING btree ("category");--> statement-breakpoint
CREATE INDEX "master_products_vehicle_idx" ON "master_products" USING btree ("vehicle_brand","vehicle_model");--> statement-breakpoint
CREATE INDEX "match_review_queue_status_idx" ON "match_review_queue" USING btree ("status");--> statement-breakpoint
CREATE INDEX "match_review_queue_supplier_product_idx" ON "match_review_queue" USING btree ("supplier_product_id");--> statement-breakpoint
CREATE UNIQUE INDEX "oem_equivalences_pair_idx" ON "oem_equivalences" USING btree ("normalized_number_a","normalized_number_b");--> statement-breakpoint
CREATE INDEX "oem_numbers_normalized_idx" ON "oem_numbers" USING btree ("normalized_number");--> statement-breakpoint
CREATE INDEX "oem_numbers_master_product_idx" ON "oem_numbers" USING btree ("master_product_id");--> statement-breakpoint
CREATE UNIQUE INDEX "supplier_products_supplier_sku_idx" ON "supplier_products" USING btree ("supplier_key","supplier_sku");--> statement-breakpoint
CREATE INDEX "supplier_products_match_status_idx" ON "supplier_products" USING btree ("match_status");--> statement-breakpoint
CREATE INDEX "supplier_products_master_product_idx" ON "supplier_products" USING btree ("master_product_id");