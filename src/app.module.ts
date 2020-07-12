import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection, Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        "type": "mongodb",
        "host": "localhost",
        "port": 27017,
        "database": "test",
        "entities": ["dist/**/*.entity{.ts,.js}"],
        "synchronize": true
    }),
    CategoryModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
