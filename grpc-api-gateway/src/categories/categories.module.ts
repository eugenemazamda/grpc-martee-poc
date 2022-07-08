import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesController } from './categories.controller';
import { CATEGORIES_PACKAGE_NAME, CATEGORIES_SERVICE_NAME } from './categories.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CATEGORIES_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: CATEGORIES_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-martee-proto/proto/categories.proto',
        },
      },
    ]),
    AuthModule
  ],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
