import { Module } from '@nestjs/common';
import { IndexController } from './index/index.controller';
import { HelloWorldUseCase } from '../../domain/usecases/index/hello-world.usecase';

const helloWorldUseCase = {
  provide: HelloWorldUseCase,
  useFactory: () => {
    return new HelloWorldUseCase();
  },
  inject: [],
};

@Module({
  providers: [helloWorldUseCase],
  imports: [],
  controllers: [IndexController],
})
export class ControllersModule {}
