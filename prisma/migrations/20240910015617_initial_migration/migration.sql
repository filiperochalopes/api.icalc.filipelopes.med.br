-- CreateTable
CREATE TABLE "DrugPresentation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Drug" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "substance" TEXT NOT NULL,
    "commercialName" TEXT NOT NULL,
    "dilution" TEXT NOT NULL,
    "volume" TEXT,
    "note" TEXT,
    "drugPresentationId" INTEGER NOT NULL,
    CONSTRAINT "Drug_drugPresentationId_fkey" FOREIGN KEY ("drugPresentationId") REFERENCES "DrugPresentation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HealthcareInstitution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "dosage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "range" TEXT NOT NULL,
    "note" TEXT,
    "references" TEXT
);

-- CreateTable
CREATE TABLE "Solvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StandardDilution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "solutionVolume" TEXT NOT NULL,
    "drugId" INTEGER NOT NULL,
    "solventId" INTEGER NOT NULL,
    "healthcareInstitutionId" INTEGER NOT NULL,
    CONSTRAINT "StandardDilution_drugId_fkey" FOREIGN KEY ("drugId") REFERENCES "Drug" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StandardDilution_solventId_fkey" FOREIGN KEY ("solventId") REFERENCES "Solvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StandardDilution_healthcareInstitutionId_fkey" FOREIGN KEY ("healthcareInstitutionId") REFERENCES "HealthcareInstitution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
