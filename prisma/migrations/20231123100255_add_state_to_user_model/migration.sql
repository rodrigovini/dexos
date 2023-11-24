/*
  Warnings:

  - Added the required column `state` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "salt" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "facebook" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("address", "city", "complement", "createAt", "email", "facebook", "fullName", "hashedPassword", "id", "instagram", "linkedin", "neighborhood", "number", "phoneNumber", "postalCode", "salt", "twitter", "username", "whatsappNumber") SELECT "address", "city", "complement", "createAt", "email", "facebook", "fullName", "hashedPassword", "id", "instagram", "linkedin", "neighborhood", "number", "phoneNumber", "postalCode", "salt", "twitter", "username", "whatsappNumber" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
