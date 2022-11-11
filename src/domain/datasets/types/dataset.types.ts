export type Dataset = {
  id: string;
  name: string;
  code: string;
};

export type UpdateDataset = Partial<Dataset> & Pick<Dataset, 'id'>;
