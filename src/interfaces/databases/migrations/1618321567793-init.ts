import {MigrationInterface, QueryRunner} from "typeorm";

export class init1618321567793 implements MigrationInterface {
    name = 'init1618321567793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `corporation` DROP COLUMN `is_in_use`");
        await queryRunner.query("ALTER TABLE `corporation` DROP COLUMN `memo`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `corporation` ADD `memo` varchar(100) NOT NULL");
        await queryRunner.query("ALTER TABLE `corporation` ADD `is_in_use` tinyint NOT NULL DEFAULT '1'");
    }

}
