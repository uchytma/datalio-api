import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOptions } from './db.config';
import { DataitemEntity } from './entities/dataitem.entity';
import { DatasetEntity } from './entities/dataset.entity';
import { DbDataitemRepository } from './repositories/DbDataitemRepository';
import { DbDatasetRepository } from './repositories/DbDatasetRepository';

const dbModule = TypeOrmModule.forRoot(getDataSourceOptions());

@Module({
  imports: [dbModule, TypeOrmModule.forFeature([DatasetEntity, DataitemEntity])],
  controllers: [],
  providers: [
    {
      provide: DbModule.DATASET_REPOSITORY,
      useClass: DbDatasetRepository,
    },
    {
      provide: DbModule.DATAITEM_REPOSITORY,
      useClass: DbDataitemRepository,
    },
  ],
  exports: [DbModule.DATASET_REPOSITORY, DbModule.DATAITEM_REPOSITORY],
})
export class DbModule {
  static readonly DATASET_REPOSITORY = 'DatasetRepository';
  static readonly DATAITEM_REPOSITORY = 'DataitemRepository';
}
