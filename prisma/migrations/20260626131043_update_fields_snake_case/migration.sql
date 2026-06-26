/*
  Warnings:

  - You are about to drop the column `userId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `order_item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `order_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "db_growstore_schemas"."cart" DROP CONSTRAINT "cart_userId_fkey";

-- DropIndex
DROP INDEX "db_growstore_schemas"."cart_userId_key";

-- AlterTable
ALTER TABLE "db_growstore_schemas"."cart" DROP COLUMN "userId",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "db_growstore_schemas"."order" DROP COLUMN "totalAmount",
ADD COLUMN     "total_amount" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "db_growstore_schemas"."order_item" DROP COLUMN "productName",
ADD COLUMN     "product_name" VARCHAR(80) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cart_user_id_key" ON "db_growstore_schemas"."cart"("user_id");

-- AddForeignKey
ALTER TABLE "db_growstore_schemas"."cart" ADD CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "db_growstore_schemas"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
