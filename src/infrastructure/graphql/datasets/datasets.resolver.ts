import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetDatasetsUsecase } from 'src/domain/datasets/usecases/get.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/datasets/usecases/getById.usecase';
import { CreateDataset, Dataset, UpdateDataset } from './datasets.schema';
import { UUIDResolver } from 'graphql-scalars';
import { CreateDatasetUsecase } from 'src/domain/datasets/usecases/create.usecase';
import { UpdateDatasetUsecase } from 'src/domain/datasets/usecases/update.usecase';

@Resolver(() => Dataset)
export class DatasetResolver {
  constructor(
    private readonly getDatasetsUsecase: GetDatasetsUsecase,
    private readonly getDatasetByIdUsecase: GetDatasetByIdUsecase,
    private readonly createDatasetUsecase: CreateDatasetUsecase,
    private readonly updateDatasetUsecase: UpdateDatasetUsecase,
  ) {}

  @Query(() => [Dataset], { name: 'datasets' })
  async datasets(): Promise<Dataset[]> {
    return await this.getDatasetsUsecase.call();
  }

  @Query(() => Dataset, { name: 'dataset', nullable: true })
  async findDatasetById(@Args('id', { type: () => UUIDResolver }) id: string): Promise<Dataset | null> {
    return await this.getDatasetByIdUsecase.call(id);
  }

  @Mutation(() => Dataset)
  async createDataset(@Args({ type: () => CreateDataset }) args: CreateDataset): Promise<Dataset> {
    return await this.createDatasetUsecase.call(args.name, args.code);
  }

  @Mutation(() => Dataset)
  async updateDataset(@Args({ type: () => UpdateDataset }) args: UpdateDataset): Promise<Dataset> {
    return await this.updateDatasetUsecase.call(args);
  }
}
