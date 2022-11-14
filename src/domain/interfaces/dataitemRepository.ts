import { Dataitem } from '../types/dataitem.types';

export interface DataitemRepository {
  getByDatasetId(datasetId: string): Promise<Dataitem[]>;
  getByDatasetIds(datasetIds: string[]): Promise<Map<string, Dataitem[]>>;
}
