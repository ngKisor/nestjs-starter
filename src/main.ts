import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filters';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import tracer from './tracer';

async function bootstrap() {
  // instrumentation
  await tracer.start();

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // logger with pino
  app.useLogger(app.get(Logger));
  // log more details on http errors
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.enableCors();

  // apply global pipes for validation https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(process.env.APP_DESC)
    .setVersion(process.env.APP_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  // apply global filter for all routes of application
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
