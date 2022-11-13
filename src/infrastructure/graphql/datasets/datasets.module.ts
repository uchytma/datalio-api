import { DynamicModule, Module } from '@nestjs/common';
import { DatasetRepository } from 'src/domain/interfaces/datasetRepository';
import { CreateDatasetUsecase } from 'src/domain/usecases/createDataset.usecase';
import { GetDatasetsUsecase } from 'src/domain/usecases/getDatasets.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/usecases/getDatasetById.usecase';
import { UpdateDatasetUsecase } from 'src/domain/usecases/updateDataset.usecase';
import { DbModule } from 'src/infrastructure/db/db.module';
import { DatasetResolver } from './datasets.resolver';
import { GetDatasetItemsUsecase } from 'src/domain/usecases/getDatasetItemsUsecase.usecase';
import { DataitemRepository } from 'src/domain/interfaces/dataitemRepository';

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
          useFactory: (repo: DatasetRepository) => new GetDatasetByIdUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY],
        },
        {
          provide: CreateDatasetUsecase,
          useFactory: (repo: DatasetRepository) => new CreateDatasetUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY],
        },
        {
          provide: UpdateDatasetUsecase,
          useFactory: (repo: DatasetRepository) => new UpdateDatasetUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY],
        },
        {
          provide: GetDatasetItemsUsecase,
          useFactory: (repo: DataitemRepository) => new GetDatasetItemsUsecase(repo),
          inject: [DbModule.DATAITEM_REPOSITORY],
        },
      ],
      exports: [],
      controllers: [],
    };
  }
}
