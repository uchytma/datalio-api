import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationBatch16684482721668448272875 implements MigrationInterface {
    name = 'migrationBatch16684482721668448272875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dataitem" DROP CONSTRAINT "FK_1e1a9061031a53473131128f727"`);
        await queryRunner.query(`ALTER TABLE "dataitem" ALTER COLUMN "datasetId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dataitem" ADD CONSTRAINT "FK_1e1a9061031a53473131128f727" FOREIGN KEY ("datasetId") REFERENCES "dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dataitem" DROP CONSTRAINT "FK_1e1a9061031a53473131128f727"`);
        await queryRunner.query(`ALTER TABLE "dataitem" ALTER COLUMN "datasetId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dataitem" ADD CONSTRAINT "FK_1e1a9061031a53473131128f727" FOREIGN KEY ("datasetId") REFERENCES "dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
