import { DynamicModule, Module } from '@nestjs/common';
import { DataitemRepository } from 'src/domain/interfaces/dataitemRepository';
import { DatasetRepository } from 'src/domain/interfaces/datasetRepository';
import { CreateDataitemUsecase } from 'src/domain/usecases/createDataitem.usecase';
import { FindDataitemsUsecase } from 'src/domain/usecases/findDataitems.usecase';
import { GetDataitemsByIdUsecase } from 'src/domain/usecases/getDataitemsById.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/usecases/getDatasetById.usecase';
import { DbModule } from 'src/infrastructure/db/db.module';
import { ElasticModule } from 'src/infrastructure/elastic/elastic.module';
import { ElasticDataitemSearchService } from 'src/infrastructure/elastic/elasticDataitemSearch.service';
import { DataitemResolver } from './dataitems.resolver';

@Module({})
export class DataitemsModule {
  static register(): DynamicModule {
    return {
      module: DataitemsModule,
      imports: [DbModule, ElasticModule.register()],
      providers: [
        DataitemResolver,
        {
          provide: GetDatasetByIdUsecase,
          useFactory: (repo: DatasetRepository) => new GetDatasetByIdUsecase(repo),
          inject: [DbModule.DATASET_REPOSITORY],
        },
        {
          provide: CreateDataitemUsecase,
          useFactory: (repo: DataitemRepository, dataitemSearchService: ElasticDataitemSearchService) =>
            new CreateDataitemUsecase(repo, dataitemSearchService),
          inject: [GetDataitemsByIdUsecase, ElasticModule.ELASTIC_DATAITEM_SEARCH_SERVICE],
        },
        {
          provide: FindDataitemsUsecase,
          useFactory: (dataitemSearchService: ElasticDataitemSearchService) =>
            new FindDataitemsUsecase(dataitemSearchService),
          inject: [ElasticModule.ELASTIC_DATAITEM_SEARCH_SERVICE],
        },
        {
          provide: GetDataitemsByIdUsecase,
          useFactory: (repo: DataitemRepository) => new GetDataitemsByIdUsecase(repo),
          inject: [DbModule.DATAITEM_REPOSITORY],
        },
      ],
      exports: [],
      controllers: [],
    };
  }
}
