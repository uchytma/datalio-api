import { DynamicModule, Module } from '@nestjs/common';
import { DatasetsController } from './datasets/datasets.controller';
import { DatasetRepository } from '../../domain/datasets/interfaces/datasetRepositoryReadonly.interface';
import { GetDatasetsUsecase } from '../../domain/datasets/usecases/get.usecase';
import { GetDatasetByIdUsecase } from '../../domain/datasets/usecases/getById.usecase';
import { DbModule } from '../db/db.module';

@Module({})
export class ControllersModule {
  static register(): DynamicModule {
    return {
      module: ControllersModule,
      imports: [DbModule],
      providers: [
        {
          provide: GetDatasetsUsecase,
          useFactory: (repo: DatasetRepository) => new GetDatasetsUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY],
        },
        {
          provide: GetDatasetByIdUsecase,
          useFactory: (repo: DatasetRepository) => new GetDatasetByIdUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY],
        },
      ],
      exports: [],
      controllers: [DatasetsController],
    };
  }
}
