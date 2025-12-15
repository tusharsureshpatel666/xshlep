-- CreateEnum
CREATE TYPE "SharingType" AS ENUM ('DAY_NIGHT', 'THREE_DAYS', 'PART_ROOM');

-- CreateEnum
CREATE TYPE "DayNight" AS ENUM ('DAY', 'NIGHT');

-- CreateEnum
CREATE TYPE "WeekType" AS ENUM ('MWF', 'TTS', 'CUSTOM');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "images" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "onboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "referralSource" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "fullAddress" TEXT NOT NULL,
    "priceInr" INTEGER NOT NULL,
    "sharingType" "SharingType" NOT NULL,
    "dayNight" "DayNight",
    "weekType" "WeekType",
    "businessType" TEXT NOT NULL,
    "bannerImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreImage" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoreImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreImage" ADD CONSTRAINT "StoreImage_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
