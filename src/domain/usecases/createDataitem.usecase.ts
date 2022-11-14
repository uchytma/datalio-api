import { DataitemRepository } from '../interfaces/dataitemRepository';
import { CreateDataitem, Dataitem } from '../types/dataitem.types';

export class CreateDataitemUsecase {
  constructor(private readonly dataitemRepository: DataitemRepository) {}

  async call(model: CreateDataitem): Promise<Dataitem> {
    return await this.dataitemRepository.create(model);
  }
}
