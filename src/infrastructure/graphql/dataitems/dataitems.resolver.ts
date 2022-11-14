import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateDataitemUsecase } from 'src/domain/usecases/createDataitem.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/usecases/getDatasetById.usecase';
import { Dataset } from '../datasets/datasets.schema';
import { CreateDataitemInput, CreateDataitemPayload, Dataitem } from './dataitems.schema';

@Resolver(() => Dataitem)
export class DataitemResolver {
  constructor(
    private readonly getDatasetByIdUsecase: GetDatasetByIdUsecase,
    private readonly createDataitemUsecase: CreateDataitemUsecase,
  ) {}

  @ResolveField('dataset', () => Dataset)
  async resolveDataset(@Parent() dataItem: Dataitem): Promise<Dataset> {
    const ds = await this.getDatasetByIdUsecase.call(dataItem.datasetId);
    if (ds == null) throw Error(); //todo: better error handling
    return ds;
  }

  @Mutation(() => CreateDataitemPayload)
  async createDataitem(
    @Args({ name: 'input', type: () => CreateDataitemInput }) input: CreateDataitemInput,
  ): Promise<CreateDataitemPayload> {
    return { dataitem: await this.createDataitemUsecase.call(input) };
  }
}
