/*
  Warnings:

  - Added the required column `roomCategoryid` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `roomCategoryid` INTEGER NOT NULL;
