import { DataitemRepository } from '../interfaces/dataitemRepository';
import { DataitemSearchService } from '../interfaces/dataitemSearchService';
import { CreateDataitem, Dataitem } from '../types/dataitem.types';

export class CreateDataitemUsecase {
  constructor(
    private readonly dataitemRepository: DataitemRepository,
    private readonly dataitemSearchService: DataitemSearchService,
  ) {}

  async call(model: CreateDataitem): Promise<Dataitem> {
    const item = await this.dataitemRepository.create(model);
    await this.dataitemSearchService.indexDataitem(item);
    return item;
  }
}
