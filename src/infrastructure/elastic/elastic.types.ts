export interface PostSearchResult<T> {
  hits: {
    total: number;
    hits: Array<{
      _source: T;
    }>;
  };
}

export class Dataitem {
  id: string;
  text: string;
  datasetId: string;
}
