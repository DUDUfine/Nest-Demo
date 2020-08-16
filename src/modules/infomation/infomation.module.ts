import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfomationService } from './infomation.service';
import { InfomationController } from './infomation.controller';
import { Infomation } from './infomation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Infomation])],
    controllers: [InfomationController],
    providers: [InfomationService],
    exports: [TypeOrmModule]
  })
  export class InfomationModule {}