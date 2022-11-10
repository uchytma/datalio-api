import { Controller, Get } from '@nestjs/common';
import { HelloWorldUseCase } from 'src/domain/usecases/index/hello-world.usecase';
import { IndexResponseDto } from './index.dtos';

@Controller()
export class IndexController {
  constructor(private readonly helloWorldUseCase: HelloWorldUseCase) {}

  @Get()
  get(): IndexResponseDto {
    return new IndexResponseDto({
      message: this.helloWorldUseCase.GetMessage(),
    });
  }
}
