import { DynamicModule, Module, Scope } from '@nestjs/common';
import { DatasetRepository } from 'src/domain/interfaces/datasetRepository';
import { CreateDatasetUsecase } from 'src/domain/usecases/createDataset.usecase';
import { GetDatasetsUsecase } from 'src/domain/usecases/getDatasets.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/usecases/getDatasetById.usecase';
import { UpdateDatasetUsecase } from 'src/domain/usecases/updateDataset.usecase';
import { DbModule } from 'src/infrastructure/db/db.module';
import { DatasetResolver } from './datasets.resolver';
import { GetDatasetsItemsUsecase } from 'src/domain/usecases/getDatasetsItems.usecase';
import { DataitemRepository } from 'src/domain/interfaces/dataitemRepository';
import { PrefetchCache } from 'src/utils/typeOrm/prefetchCache';
import { Dataitem } from '../dataitems/dataitems.schema';

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
          provide: GetDatasetsItemsUsecase,
          useFactory: (repo: DataitemRepository) => new GetDatasetsItemsUsecase(repo),
          inject: [DbModule.DATAITEM_REPOSITORY],
        },
        {
          provide: PrefetchCache<string, Dataitem[]>,
          useFactory: (usecase: GetDatasetsItemsUsecase) =>
            new PrefetchCache<string, Dataitem[]>((keys) => usecase.call(keys)),
          scope: Scope.REQUEST,
          inject: [GetDatasetsItemsUsecase],
        },
      ],
      exports: [],
      controllers: [],
    };
  }
}
