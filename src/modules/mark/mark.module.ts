import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';
import { Mark } from './mark.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Mark])],
    controllers: [MarkController],
    providers: [MarkService],
    exports: [TypeOrmModule]
  })


export class MarkModule {}