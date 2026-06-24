/*
  Warnings:

  - Changed the type of `gender` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "db_growstore_schemas"."Gender" AS ENUM ('MALE', 'FEMALE', 'UNISEX');

-- AlterTable
ALTER TABLE "db_growstore_schemas"."product" DROP COLUMN "gender",
ADD COLUMN     "gender" "db_growstore_schemas"."Gender" NOT NULL;
