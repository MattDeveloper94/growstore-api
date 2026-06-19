/*
  Warnings:

  - You are about to drop the column `update_at` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `product` table. All the data in the column will be lost.
  - The `status` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `produto_varaint_id` on the `product_image` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `product_variant` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_variant_id,display_order]` on the table `product_image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_variant_id` to the `product_image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product_variant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "db_growstore_schemas"."Role" AS ENUM ('CUSTOMER', 'SELLER', 'ADMIN');

-- CreateEnum
CREATE TYPE "db_growstore_schemas"."ProductStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'DISCONTINUED');

-- DropForeignKey
ALTER TABLE "db_growstore_schemas"."cart" DROP CONSTRAINT "cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "db_growstore_schemas"."product_image" DROP CONSTRAINT "product_image_produto_varaint_id_fkey";

-- AlterTable
ALTER TABLE "db_growstore_schemas"."cart" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "db_growstore_schemas"."category" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "db_growstore_schemas"."product" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "db_growstore_schemas"."ProductStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "db_growstore_schemas"."product_image" DROP COLUMN "produto_varaint_id",
ADD COLUMN     "product_variant_id" UUID NOT NULL,
ALTER COLUMN "display_order" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "db_growstore_schemas"."product_variant" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "db_growstore_schemas"."user" DROP COLUMN "update_at",
ADD COLUMN     "role" "db_growstore_schemas"."Role" NOT NULL DEFAULT 'CUSTOMER',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "db_growstore_schemas"."address" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" VARCHAR(30) NOT NULL,
    "street" VARCHAR(80) NOT NULL,
    "number" VARCHAR(10) NOT NULL,
    "complement" VARCHAR(80),
    "neighborhood" VARCHAR(60) NOT NULL,
    "city" VARCHAR(30) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "zipCode" VARCHAR(20) NOT NULL,
    "country" VARCHAR(30) NOT NULL,
    "reference_point" VARCHAR(60),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "db_growstore_schemas"."order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "address_id" UUID NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "db_growstore_schemas"."order_item" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productName" VARCHAR(80) NOT NULL,
    "sku" VARCHAR(60) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "order_id" UUID NOT NULL,
    "product_variant_id" UUID NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_item_order_id_product_variant_id_key" ON "db_growstore_schemas"."order_item"("order_id", "product_variant_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_image_product_variant_id_display_order_key" ON "db_growstore_schemas"."product_image"("product_variant_id", "display_order");

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "db_growstore_schemas"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "db_growstore_schemas"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."product_image" ADD CONSTRAINT "product_image_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "db_growstore_schemas"."product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "db_growstore_schemas"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."order" ADD CONSTRAINT "order_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "db_growstore_schemas"."address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "db_growstore_schemas"."order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."order_item" ADD CONSTRAINT "order_item_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "db_growstore_schemas"."product_variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
