/*
  Warnings:

  - You are about to drop the column `categoryId` on the `CoffeeShop` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoffeeShop" DROP CONSTRAINT "CoffeeShop_categoryId_fkey";

-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "categoryId";
