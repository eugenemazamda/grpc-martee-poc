import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import ormConfig from './configuration/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig
    }),
    UserModule,
    AuthModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
