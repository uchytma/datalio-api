import { Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { DbModule } from './infrastructure/db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DbModule,
    ControllersModule.register(),
    ConfigModule.forRoot({ envFilePath: 'dev.env', isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
