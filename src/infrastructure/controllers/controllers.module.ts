import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndexController } from './index/index.controller';
import { HelloWorldUseCase } from '../../domain/usecases/index/hello-world.usecase';
import { DatasetsController } from './datasets/datasets.controller';
import { DatasetRepositoryReadonly } from '../../domain/datasets/interfaces/datasetRepositoryReadonly.interface';
import { DbDatasetRepository } from '../db/repositories/DbDatasetRepository';
import { DatasetEntity } from '../db/entities/dataset.entity';
import { GetDatasetsUsecase } from '../../domain/datasets/usecases/get.usecase';
import { GetDatasetByIdUsecase } from '../../domain/datasets/usecases/getById.usecase';

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
      imports: [TypeOrmModule.forFeature([DatasetEntity])],
      providers: [
        helloWorldUseCase,
        { provide: 'DatasetRepositoryReadonly', useClass: DbDatasetRepository },
        {
          provide: 'GetDatasetsUsecase',
          useFactory: (repo: DatasetRepositoryReadonly) =>
            new GetDatasetsUsecase(repo),
          inject: ['DatasetRepositoryReadonly'],
        },
        {
          provide: 'GetDatasetByIdUsecase',
          useFactory: (repo: DatasetRepositoryReadonly) =>
            new GetDatasetByIdUsecase(repo),
          inject: ['DatasetRepositoryReadonly'],
        },
      ],
      exports: [],
      controllers: [IndexController, DatasetsController],
    };
  }
}
