import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1606912010269 implements MigrationInterface {
    name = 'AddUserTable1606912010269';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "public"."user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "active" boolean NOT NULL DEFAULT false, "last_login" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b7a5e4a3b174e954b2dabf2ef9e" UNIQUE ("email"), CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."user"`);
    }
}
