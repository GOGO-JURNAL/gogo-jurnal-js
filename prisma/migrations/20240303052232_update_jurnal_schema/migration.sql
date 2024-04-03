/*
  Warnings:

  - You are about to drop the column `type` on the `jurnal` table. All the data in the column will be lost.
  - You are about to alter the column `category` on the `jurnal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Enum(EnumId(0))`.
  - Added the required column `publication` to the `jurnal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jurnal` DROP COLUMN `type`,
    ADD COLUMN `publication` VARCHAR(100) NOT NULL,
    MODIFY `cite` VARCHAR(255) NULL,
    MODIFY `category` ENUM('SCOPUS', 'RISET', 'PENGABDIAN') NULL;
