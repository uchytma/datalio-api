import { CreateDataitem, Dataitem } from '../types/dataitem.types';

export interface DataitemRepository {
  getByIds(ids: string[]): Promise<Dataitem[]>;
  getByDatasetId(datasetId: string): Promise<Dataitem[]>;
  getByDatasetIds(datasetIds: string[]): Promise<Map<string, Dataitem[]>>;
  create(model: CreateDataitem): Promise<Dataitem>;
}
