import { DynamicModule, Module } from '@nestjs/common';
import { DatasetRepository } from 'src/domain/datasets/interfaces/datasetRepositoryReadonly.interface';
import { CreateDatasetUsecase } from 'src/domain/datasets/usecases/create.usecase';
import { GetDatasetsUsecase } from 'src/domain/datasets/usecases/get.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/datasets/usecases/getById.usecase';
import { UpdateDatasetUsecase } from 'src/domain/datasets/usecases/update.usecase';
import { DbModule } from 'src/infrastructure/db/db.module';
import { DatasetResolver } from './datasets.resolver';

@Module({})
export class DatasetsModule {
  static register(): DynamicModule {
    return {
      module: DatasetsModule,
      imports: [DbModule],
      providers: [
        DatasetResolver,
        {
          provide: GetDatasetsUsecase,
          useFactory: (repo: DatasetRepository) => new GetDatasetsUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY],
        },
        {
          provide: GetDatasetByIdUsecase,
          useFactory: (repo: DatasetRepository) =>
            new GetDatasetByIdUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY],
        },
        {
          provide: CreateDatasetUsecase,
          useFactory: (repo: DatasetRepository) =>
            new CreateDatasetUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY],
        },
        {
          provide: UpdateDatasetUsecase,
          useFactory: (repo: DatasetRepository) =>
            new UpdateDatasetUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY],
        },
      ],
      exports: [],
      controllers: [],
    };
  }
}
