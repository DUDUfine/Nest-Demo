import { Module } from '@nestjs/common';
import { CategoryModule } from './category.module';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [CategoryModule],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryHttpModule {}