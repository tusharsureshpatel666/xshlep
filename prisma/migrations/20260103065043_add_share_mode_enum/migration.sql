/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `peopleDesc` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shareMode` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeSize` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ShareMode" AS ENUM ('HOURS_BY_HOURS', 'DAYS_BY_DAYS', 'SPLIT_STORE', 'DAY_OR_NIGHT', 'WEEKEND', 'REGULAR');

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "dayOrNight" TEXT,
ADD COLUMN     "days" TEXT[],
ADD COLUMN     "endTime" TEXT,
ADD COLUMN     "peopleDesc" TEXT NOT NULL,
ADD COLUMN     "shareMode" "ShareMode" NOT NULL,
ADD COLUMN     "sqft" INTEGER,
ADD COLUMN     "startTime" TEXT,
ADD COLUMN     "storeSize" TEXT NOT NULL,
ADD COLUMN     "totalHour" TEXT,
ADD COLUMN     "videoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
