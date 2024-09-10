/*
  Warnings:

  - You are about to drop the `dosage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "dosage";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Dosage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "range" TEXT NOT NULL,
    "note" TEXT,
    "references" TEXT,
    "drugId" INTEGER NOT NULL,
    CONSTRAINT "Dosage_drugId_fkey" FOREIGN KEY ("drugId") REFERENCES "Drug" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
