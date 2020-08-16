import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection, Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './modules/user/user.module';
import { TagModule } from './modules/tag/tag.module';
import { InfomationModule } from './modules/infomation/infomation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        "type": "mongodb",
        "host": "localhost",
        "port": 27017,
        // "username": 'root',
        // "password": '123456',
        "database": "test",
        "entities": ["dist/**/*.entity{.ts,.js}"],
        "synchronize": true
    }),
    UserModule,
    TagModule,
    InfomationModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
