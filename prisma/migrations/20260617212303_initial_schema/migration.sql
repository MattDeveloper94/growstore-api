-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "db_growstore_schemas";

-- CreateTable
CREATE TABLE "db_growstore_schemas"."user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "password" VARCHAR(80) NOT NULL,
    "birth_date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "db_growstore_schemas"."cart" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "db_growstore_schemas"."cart_item" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "quantity" INTEGER NOT NULL,
    "cart_id" UUID NOT NULL,
    "product_variant_id" UUID NOT NULL,

    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "db_growstore_schemas"."product" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "brand" VARCHAR(20) NOT NULL,
    "collection" VARCHAR(60),
    "material" VARCHAR(60) NOT NULL,
    "gender" VARCHAR(40) NOT NULL,
    "status" VARCHAR(40) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "db_growstore_schemas"."product_variant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sku" VARCHAR(60) NOT NULL,
    "color" VARCHAR(20) NOT NULL,
    "size" VARCHAR(10) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "product_id" UUID NOT NULL,

    CONSTRAINT "product_variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "db_growstore_schemas"."category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "db_growstore_schemas"."product_image" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" TEXT NOT NULL,
    "alt_text" VARCHAR(60) NOT NULL,
    "display_order" INTEGER NOT NULL,
    "produto_varaint_id" UUID NOT NULL,

    CONSTRAINT "product_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "db_growstore_schemas"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cart_userId_key" ON "db_growstore_schemas"."cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_cart_id_product_variant_id_key" ON "db_growstore_schemas"."cart_item"("cart_id", "product_variant_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_variant_sku_key" ON "db_growstore_schemas"."product_variant"("sku");

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "db_growstore_schemas"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."cart_item" ADD CONSTRAINT "cart_item_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "db_growstore_schemas"."cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."cart_item" ADD CONSTRAINT "cart_item_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "db_growstore_schemas"."product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "db_growstore_schemas"."category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."product_variant" ADD CONSTRAINT "product_variant_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "db_growstore_schemas"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."product_image" ADD CONSTRAINT "product_image_produto_varaint_id_fkey" FOREIGN KEY ("produto_varaint_id") REFERENCES "db_growstore_schemas"."product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
