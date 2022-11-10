import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationBatch16680912951668091296382 implements MigrationInterface {
    name = 'migrationBatch16680912951668091296382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "data_set" ("guid" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_756a4d5007caa8c1efaf1bb3a95" UNIQUE ("code"), CONSTRAINT "PK_d0035e6088cc630954e10d6a4cd" PRIMARY KEY ("guid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "data_set"`);
    }

}
