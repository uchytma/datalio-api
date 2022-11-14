import { DynamicModule, Module } from '@nestjs/common';
import { DatasetRepository } from 'src/domain/interfaces/datasetRepository';
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
      ],
      exports: [],
      controllers: [],
    };
  }
}
