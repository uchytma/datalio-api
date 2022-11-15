import { Module } from '@nestjs/common';
import { DbModule } from './infrastructure/db/db.module';
import { ConfigModule } from '@nestjs/config';

import { GraphqlModule } from './infrastructure/graphql/graphql.module';
import { ElasticModule } from './infrastructure/elastic/elastic.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'dev.env', isGlobal: true }),
    DbModule,
    GraphqlModule.register(),
    ElasticModule.register(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
