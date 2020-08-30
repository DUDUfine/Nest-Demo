import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

import {TransformInterceptor } from './interceptors/transform.interceptor';
import {LoggingInterceptor } from './interceptors/logging.interceptor';


import * as APP_CONFIG  from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Nest DEMO API')
    .setDescription('The API OF Nest Project DEMO!')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); // 启动服务后访问http://localhost:3000/api/#/

  // 为每个路由设置前缀
  app.setGlobalPrefix('v1');

  app.useGlobalInterceptors( new TransformInterceptor(), new LoggingInterceptor());

  await app.listen(APP_CONFIG.APP.PORT);
}
bootstrap().then(() => {
  console.info(`NodePress Run！port at 3000`);
});
