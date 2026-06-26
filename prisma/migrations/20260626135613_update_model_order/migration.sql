/*
  Warnings:

  - A unique constraint covering the columns `[order_number]` on the table `order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "db_growstore_schemas"."order" ADD COLUMN     "order_number" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "order_order_number_key" ON "db_growstore_schemas"."order"("order_number");
