/*
  Warnings:

  - Added the required column `brand` to the `feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedback" ADD COLUMN     "brand" INT4 NOT NULL;
