-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "subscriptionIntervalDays" INTEGER;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL DEFAULT 0;
