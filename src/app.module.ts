import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { createConnection, Connection } from 'typeorm';

// import { LoggingMiddleware } from './middlewares/logging.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './modules/user/user.module';
import { TagModule } from './modules/tag/tag.module';
import { InfomationModule } from './modules/infomation/infomation.module';
import { MarkModule } from './modules/mark/mark.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      // "username": 'root',
      // "password": '123456',
      database: 'test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    TagModule,
    InfomationModule,
    MarkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggingMiddleware).forRoutes('*');
  // }
  constructor(private readonly connection: Connection) {}
}
