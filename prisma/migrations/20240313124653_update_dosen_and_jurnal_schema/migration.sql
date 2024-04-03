/*
  Warnings:

  - You are about to drop the column `university_id` on the `jurnal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sinta_id]` on the table `dosen` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `jurnal` DROP FOREIGN KEY `jurnal_university_id_fkey`;

-- AlterTable
ALTER TABLE `jurnal` DROP COLUMN `university_id`;

-- CreateIndex
CREATE UNIQUE INDEX `dosen_sinta_id_key` ON `dosen`(`sinta_id`);
