/*
  Warnings:

  - Added the required column `costume` to the `Costume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendee" ADD COLUMN     "costumeId" INTEGER;

-- AlterTable
ALTER TABLE "Costume" ADD COLUMN     "costume" TEXT NOT NULL;
