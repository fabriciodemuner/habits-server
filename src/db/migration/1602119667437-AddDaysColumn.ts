import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDaysColumn1602119667437 implements MigrationInterface {
    name = 'AddDaysColumn1602119667437';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."habit" ADD "days" json NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."habit" DROP COLUMN "days"`);
    }
}
