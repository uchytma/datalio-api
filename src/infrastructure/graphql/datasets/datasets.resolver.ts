import { Args, Mutation, Query, Resolver, ResolveField, Parent, Info } from '@nestjs/graphql';
import { GetDatasetsUsecase } from 'src/domain/usecases/getDatasets.usecase';
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
import { Dataitem } from '../dataitems/dataitems.schema';
import { PrefetchCache } from 'src/utils/prefetchCache/prefetchCache';
import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType } from 'graphql-parse-resolve-info';

@Resolver(() => Dataset)
export class DatasetResolver {
  constructor(
    private readonly getDatasetsUsecase: GetDatasetsUsecase,
    private readonly getDatasetByIdUsecase: GetDatasetByIdUsecase,
    private readonly createDatasetUsecase: CreateDatasetUsecase,
    private readonly updateDatasetUsecase: UpdateDatasetUsecase,
    private readonly prefetchCacheDataItems: PrefetchCache<string, Dataitem[]>,
  ) {}

  @Query(() => [Dataset], { name: 'datasets' })
  async datasets(@Info() info: GraphQLResolveInfo): Promise<Dataset[]> {
    const data = await this.getDatasetsUsecase.call();

    const parsedInfo = parseResolveInfo(info) as ResolveTree;
    const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(parsedInfo, info.returnType);
    if ('dataitems' in simplifiedInfo.fields) {
      // prefetch dataitems from DB - batch query optimization
      this.prefetchCacheDataItems.registerKeys(data.map((d) => d.id));
    }
    return data;
  }

  @Query(() => Dataset, { name: 'dataset', nullable: true })
  async findDatasetById(@Args('id', { type: () => UUIDResolver }) id: string): Promise<Dataset | null> {
    return await this.getDatasetByIdUsecase.call(id);
  }

  @ResolveField('dataitems', () => [Dataitem])
  async resolveDataitems(@Parent() dataset: Dataset): Promise<Dataitem[]> {
    return await this.prefetchCacheDataItems.get(dataset.id);
  }

  @Mutation(() => CreateDatasetPayload)
  async createDataset(
    @Args({ name: 'input', type: () => CreateDatasetInput }) input: CreateDatasetInput,
  ): Promise<CreateDatasetPayload> {
    return { dataset: await this.createDatasetUsecase.call(input.name, input.code) };
  }

  @Mutation(() => UpdateDatasetPayload)
  async updateDataset(
    @Args({ name: 'input', type: () => UpdateDatasetInput }) input: UpdateDatasetInput,
  ): Promise<UpdateDatasetPayload> {
    return { dataset: await this.updateDatasetUsecase.call(input) };
  }
}
