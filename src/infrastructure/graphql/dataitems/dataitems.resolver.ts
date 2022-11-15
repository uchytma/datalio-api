import { Query, Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateDataitemUsecase } from 'src/domain/usecases/createDataitem.usecase';
import { FindDataitemsUsecase } from 'src/domain/usecases/findDataitems.usecase';
import { GetDataitemsByIdUsecase } from 'src/domain/usecases/getDataitemsById.usecase';
import { GetDatasetByIdUsecase } from 'src/domain/usecases/getDatasetById.usecase';
import { Dataset } from '../datasets/datasets.schema';
import {
  CreateDataitemInput,
  CreateDataitemPayload,
  Dataitem,
  DataitemFindResult,
  FindDataitemsInput,
} from './dataitems.schema';

@Resolver(() => Dataitem)
export class DataitemResolver {
  constructor(
    private readonly getDatasetByIdUsecase: GetDatasetByIdUsecase,
    private readonly createDataitemUsecase: CreateDataitemUsecase,
    private readonly findDataitemsUsecase: FindDataitemsUsecase,
    private readonly getDataitemsByIdUsecase: GetDataitemsByIdUsecase,
  ) {}

  @ResolveField('dataset', () => Dataset)
  async resolveDataset(@Parent() dataItem: Dataitem): Promise<Dataset> {
    const ds = await this.getDatasetByIdUsecase.call(dataItem.datasetId);
    if (ds == null) throw Error(); //todo: better error handling
    return ds;
  }

  @Query(() => [DataitemFindResult], { name: 'findDataitems' })
  async FindDataitems(@Args() input: FindDataitemsInput): Promise<DataitemFindResult[]> {
    const results = await this.findDataitemsUsecase.call(input.text);
    const dataitems = await this.getDataitemsByIdUsecase.call(results.map((r) => r.id));
    return results.map((r) => {
      const dataitem = dataitems.find((d) => d.id === r.id);
      if (dataitem == null) throw Error(); //todo: better error handling
      return { dataitem: dataitem, score: r.score };
    });
  }

  @Mutation(() => CreateDataitemPayload)
  async createDataitem(
    @Args({ name: 'input', type: () => CreateDataitemInput }) input: CreateDataitemInput,
  ): Promise<CreateDataitemPayload> {
    return { dataitem: await this.createDataitemUsecase.call(input) };
  }
}
