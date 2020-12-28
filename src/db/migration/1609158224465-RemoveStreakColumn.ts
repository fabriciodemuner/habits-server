import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveStreakColumn1609158224465 implements MigrationInterface {
    name = 'RemoveStreakColumn1609158224465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."habit" DROP COLUMN "streak"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."habit" ADD "streak" integer NOT NULL DEFAULT 0`);
    }

}
