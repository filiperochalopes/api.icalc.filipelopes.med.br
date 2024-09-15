-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StandardDilution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "solutionVolume" TEXT NOT NULL,
    "soluteVolume" TEXT NOT NULL DEFAULT '1ml',
    "drugId" INTEGER NOT NULL,
    "solventId" INTEGER NOT NULL,
    "healthcareInstitutionId" INTEGER NOT NULL,
    CONSTRAINT "StandardDilution_drugId_fkey" FOREIGN KEY ("drugId") REFERENCES "Drug" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StandardDilution_solventId_fkey" FOREIGN KEY ("solventId") REFERENCES "Solvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StandardDilution_healthcareInstitutionId_fkey" FOREIGN KEY ("healthcareInstitutionId") REFERENCES "HealthcareInstitution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StandardDilution" ("drugId", "healthcareInstitutionId", "id", "name", "solutionVolume", "solventId") SELECT "drugId", "healthcareInstitutionId", "id", "name", "solutionVolume", "solventId" FROM "StandardDilution";
DROP TABLE "StandardDilution";
ALTER TABLE "new_StandardDilution" RENAME TO "StandardDilution";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
