import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import ormConfig from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig
    }),
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
