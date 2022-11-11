import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOptions } from './db.config';
import { DatasetEntity } from './entities/dataset.entity';
import { DbDatasetRepository } from './repositories/DbDatasetRepository';

const dbModule = TypeOrmModule.forRoot(getDataSourceOptions());

@Module({
  imports: [dbModule, TypeOrmModule.forFeature([DatasetEntity])],
  controllers: [],
  providers: [
    {
      provide: DbModule.DATASET_REPOSITORY,
      useClass: DbDatasetRepository,
    },
  ],
  exports: [DbModule.DATASET_REPOSITORY],
})
export class DbModule {
  static readonly DATASET_REPOSITORY = 'DatasetRepositoryReadonly';
}
