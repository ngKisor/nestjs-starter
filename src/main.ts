import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';

async function bootstrap() {
  config()
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
  .setTitle(process.env.APP_NAME)
  .setDescription(process.env.APP_DESC)
  .setVersion(process.env.APP_VERSION)
  .build();

const document = SwaggerModule.createDocument(app, swaggerConfig);

SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
