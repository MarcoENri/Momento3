/*
  Warnings:

  - Added the required column `budget` to the `Attendee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendee" ADD COLUMN     "budget" DOUBLE PRECISION NOT NULL;
