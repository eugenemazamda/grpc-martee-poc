import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // configuration documentation swagger
  // const config = new DocumentBuilder()
  //   .setTitle('API Backend v1')
  //   .setDescription('The Martee it API Description')
  //   .setVersion('1.0')
  //   .addTag('1.0')
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api/documentation', app, document);

  // configuration cookie 
  // app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
