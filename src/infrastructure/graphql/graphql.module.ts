import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatasetsModule } from './datasets/datasets.module';
import { DataitemsModule } from './dataitems/dataitems.module';

@Module({})
export class GraphqlModule {
  static register(): DynamicModule {
    return {
      module: GraphqlModule,
      imports: [
        DatasetsModule.register(),
        DataitemsModule.register(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
          sortSchema: true,
        }),
      ],
      providers: [],
      exports: [],
      controllers: [],
    };
  }
}
