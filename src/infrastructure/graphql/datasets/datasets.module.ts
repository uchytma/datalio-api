import { DynamicModule, Module } from '@nestjs/common';
import { DatasetRepositoryReadonly } from 'src/domain/datasets/interfaces/datasetRepositoryReadonly.interface';
import { GetDatasetsUsecase } from 'src/domain/datasets/usecases/get.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/datasets/usecases/getById.usecase';
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
          useFactory: (repo: DatasetRepositoryReadonly) =>
            new GetDatasetsUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY_READONLY],
        },
        {
          provide: GetDatasetByIdUsecase,
          useFactory: (repo: DatasetRepositoryReadonly) =>
            new GetDatasetByIdUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY_READONLY],
        },
      ],
      exports: [],
      controllers: [],
    };
  }
}
