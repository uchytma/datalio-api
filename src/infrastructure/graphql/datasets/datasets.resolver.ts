import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetDatasetsUsecase } from 'src/domain/datasets/usecases/get.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/datasets/usecases/getById.usecase';
import { Dataset } from './datasets.schema';
import { UUIDResolver } from 'graphql-scalars';

@Resolver(() => Dataset)
export class DatasetResolver {
  constructor(
    private readonly getDatasetsUsecase: GetDatasetsUsecase,
    private readonly getDatasetByIdUsecase: GetDatasetByIdUsecase,
  ) {}

  @Query(() => [Dataset], { name: 'datasets' })
  async datasets() {
    return this.getDatasetsUsecase.get();
  }

  @Query(() => Dataset, { name: 'dataset', nullable: true })
  async findDatasetById(@Args('id', { type: () => UUIDResolver }) id: string) {
    return this.getDatasetByIdUsecase.get(id);
  }
}
