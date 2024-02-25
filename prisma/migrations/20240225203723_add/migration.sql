/*
  Warnings:

  - Added the required column `image` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kilometers` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "kilometers" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;
