import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserToHabit1607560919837 implements MigrationInterface {
    name = 'AddUserToHabit1607560919837';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."habit" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(
            `ALTER TABLE "public"."habit" ADD CONSTRAINT "FK_94dab5ce389b6dcc1844bc48ad8" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."habit" DROP CONSTRAINT "FK_94dab5ce389b6dcc1844bc48ad8"`);
        await queryRunner.query(`ALTER TABLE "public"."habit" DROP COLUMN "user_id"`);
    }
}
