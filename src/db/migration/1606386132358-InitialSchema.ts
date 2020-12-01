import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1606386132358 implements MigrationInterface {
    name = 'InitialSchema1606386132358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."habit" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "streak" integer NOT NULL DEFAULT 0, "days" json NOT NULL DEFAULT '[]', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_491b5930b1865bfcd74a8e96670" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."habit"`);
    }

}
