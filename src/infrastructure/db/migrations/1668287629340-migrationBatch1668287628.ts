import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationBatch16682876281668287629340 implements MigrationInterface {
    name = 'migrationBatch16682876281668287629340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dataitem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "text" character varying NOT NULL, "datasetId" uuid, CONSTRAINT "PK_e096a86bbca723dd6692b3a4284" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dataitem" ADD CONSTRAINT "FK_1e1a9061031a53473131128f727" FOREIGN KEY ("datasetId") REFERENCES "dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dataitem" DROP CONSTRAINT "FK_1e1a9061031a53473131128f727"`);
        await queryRunner.query(`DROP TABLE "dataitem"`);
    }

}
