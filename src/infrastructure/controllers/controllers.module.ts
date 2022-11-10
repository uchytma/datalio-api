import { DynamicModule, Module } from '@nestjs/common';
import { IndexController } from './index/index.controller';
import { HelloWorldUseCase } from '../../domain/usecases/index/hello-world.usecase';
import { DatasetsController } from './datasets/datasets.controller';
import { DatasetRepositoryReadonly } from '../../domain/datasets/interfaces/datasetRepositoryReadonly.interface';
import { GetDatasetsUsecase } from '../../domain/datasets/usecases/get.usecase';
import { GetDatasetByIdUsecase } from '../../domain/datasets/usecases/getById.usecase';
import { DbModule } from '../db/db.module';

const helloWorldUseCase = {
  provide: HelloWorldUseCase,
  useFactory: () => {
    return new HelloWorldUseCase();
  },
  inject: [],
};

@Module({})
export class ControllersModule {
  static register(): DynamicModule {
    return {
      module: ControllersModule,
      imports: [DbModule],
      providers: [
        helloWorldUseCase,
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
      controllers: [IndexController, DatasetsController],
    };
  }
}
