import { DynamicModule, Module } from '@nestjs/common';
import { DataitemRepository } from 'src/domain/interfaces/dataitemRepository';
import { DatasetRepository } from 'src/domain/interfaces/datasetRepository';
import { CreateDataitemUsecase } from 'src/domain/usecases/createDataitem.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/usecases/getDatasetById.usecase';
import { DbModule } from 'src/infrastructure/db/db.module';
import { DataitemResolver } from './dataitems.resolver';

@Module({})
export class DataitemsModule {
  static register(): DynamicModule {
    return {
      module: DataitemsModule,
      imports: [DbModule],
      providers: [
        DataitemResolver,
        {
          provide: GetDatasetByIdUsecase,
          useFactory: (repo: DatasetRepository) => new GetDatasetByIdUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY],
        },
        {
          provide: CreateDataitemUsecase,
          useFactory: (repo: DataitemRepository) => new CreateDataitemUsecase(repo),
          inject: [DbModule.DATAITEM_REPOSITORY],
        },
      ],
      exports: [],
      controllers: [],
    };
  }
}
