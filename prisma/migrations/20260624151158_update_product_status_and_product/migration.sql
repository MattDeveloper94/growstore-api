/*
  Warnings:

  - The values [DRAFT] on the enum `ProductStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "db_growstore_schemas"."ProductStatus_new" AS ENUM ('ACTIVE', 'INACTIVE', 'DISCONTINUED');
ALTER TABLE "db_growstore_schemas"."product" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "db_growstore_schemas"."product" ALTER COLUMN "status" TYPE "db_growstore_schemas"."ProductStatus_new" USING ("status"::text::"db_growstore_schemas"."ProductStatus_new");
ALTER TYPE "db_growstore_schemas"."ProductStatus" RENAME TO "ProductStatus_old";
ALTER TYPE "db_growstore_schemas"."ProductStatus_new" RENAME TO "ProductStatus";
DROP TYPE "db_growstore_schemas"."ProductStatus_old";
ALTER TABLE "db_growstore_schemas"."product" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "db_growstore_schemas"."product" ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "brand" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
