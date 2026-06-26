/*
  Warnings:

  - A unique constraint covering the columns `[product_id,color,size]` on the table `product_variant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_variant_product_id_color_size_key" ON "db_growstore_schemas"."product_variant"("product_id", "color", "size");
