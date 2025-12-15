/*
  Warnings:

  - You are about to drop the column `dayNight` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `sharingType` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `weekType` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "dayNight",
DROP COLUMN "sharingType",
DROP COLUMN "weekType";

-- DropEnum
DROP TYPE "DayNight";

-- DropEnum
DROP TYPE "SharingType";

-- DropEnum
DROP TYPE "WeekType";
