/*
  Warnings:

  - Added the required column `cellPhone` to the `Technician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Technician` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Technician" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cellPhone" TEXT NOT NULL,
    "commercialPhone" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Technician" ("createAt", "email", "id", "name") SELECT "createAt", "email", "id", "name" FROM "Technician";
DROP TABLE "Technician";
ALTER TABLE "new_Technician" RENAME TO "Technician";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
