import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetDatasetsUsecase } from 'src/domain/usecases/getDataset.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/usecases/getDatasetById.usecase';
import {
  CreateDatasetInput,
  CreateDatasetPayload,
  Dataset,
  UpdateDatasetInput,
  UpdateDatasetPayload,
} from './datasets.schema';
import { UUIDResolver } from 'graphql-scalars';
import { CreateDatasetUsecase } from 'src/domain/usecases/createDataset.usecase';
import { UpdateDatasetUsecase } from 'src/domain/usecases/updateDataset.usecase';

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

  @Mutation(() => CreateDatasetPayload)
  async createDataset(
    @Args({ type: () => CreateDatasetInput }) args: CreateDatasetInput,
  ): Promise<CreateDatasetPayload> {
    return { dataset: await this.createDatasetUsecase.call(args.name, args.code) };
  }

  @Mutation(() => UpdateDatasetPayload)
  async updateDataset(
    @Args({ type: () => UpdateDatasetInput }) args: UpdateDatasetInput,
  ): Promise<UpdateDatasetPayload> {
    return { dataset: await this.updateDatasetUsecase.call(args) };
  }
}
