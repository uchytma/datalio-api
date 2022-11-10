import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationBatch16681014181668101418982 implements MigrationInterface {
    name = 'migrationBatch16681014181668101418982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dataset" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_a1051e92c2faf38ca32477974d6" UNIQUE ("code"), CONSTRAINT "PK_36c1c67adb3d1dd69ae57f18913" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dataset"`);
    }

}
