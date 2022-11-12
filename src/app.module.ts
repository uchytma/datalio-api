import { Module } from '@nestjs/common';
import { DbModule } from './infrastructure/db/db.module';
import { ConfigModule } from '@nestjs/config';

import { GraphqlModule } from './infrastructure/graphql/graphql.module';

@Module({
  imports: [DbModule, GraphqlModule.register(), ConfigModule.forRoot({ envFilePath: 'dev.env', isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
