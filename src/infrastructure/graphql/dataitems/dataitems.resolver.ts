import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GetDatasetByIdUsecase } from 'src/domain/usecases/getDatasetById.usecase';
import { Dataset } from '../datasets/datasets.schema';
import { Dataitem } from './dataitems.schema';

@Resolver(() => Dataitem)
export class DataitemResolver {
  constructor(private readonly getDatasetByIdUsecase: GetDatasetByIdUsecase) {}

  @ResolveField('dataset', () => Dataset)
  async resolveDataset(@Parent() dataItem: Dataitem): Promise<Dataset> {
    const ds = await this.getDatasetByIdUsecase.call(dataItem.datasetId);
    if (ds == null) throw Error(); //todo: better error handling
    return ds;
  }
}
