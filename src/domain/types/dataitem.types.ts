export type Dataitem = {
  id: string;
  title: string;
  text: string;
  datasetId: string;
};

export type CreateDataitem = Omit<Dataitem, 'id'>;
