/*
  Warnings:

  - A unique constraint covering the columns `[contractId]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contractId]` on the table `Election` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contractId` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractId` to the `Election` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "contractId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Election" ADD COLUMN     "contractId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_contractId_key" ON "Candidate"("contractId");

-- CreateIndex
CREATE UNIQUE INDEX "Election_contractId_key" ON "Election"("contractId");
