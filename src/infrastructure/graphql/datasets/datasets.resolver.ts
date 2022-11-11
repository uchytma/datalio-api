import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetDatasetsUsecase } from 'src/domain/datasets/usecases/get.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/datasets/usecases/getById.usecase';
import { CreateDataset, Dataset } from './datasets.schema';
import { UUIDResolver } from 'graphql-scalars';
import { CreateDatasetUsecase } from 'src/domain/datasets/usecases/create.usecase';

@Resolver(() => Dataset)
export class DatasetResolver {
  constructor(
    private readonly getDatasetsUsecase: GetDatasetsUsecase,
    private readonly getDatasetByIdUsecase: GetDatasetByIdUsecase,
    private readonly createDatasetUsecase: CreateDatasetUsecase,
  ) {}

  @Query(() => [Dataset], { name: 'datasets' })
  async datasets() {
    return await this.getDatasetsUsecase.call();
  }

  @Query(() => Dataset, { name: 'dataset', nullable: true })
  async findDatasetById(@Args('id', { type: () => UUIDResolver }) id: string) {
    return await this.getDatasetByIdUsecase.call(id);
  }

  @Mutation(() => Dataset)
  async createDataset(
    @Args({ type: () => CreateDataset }) args: CreateDataset,
  ) {
    return await this.createDatasetUsecase.call(args.name, args.code);
  }
}
