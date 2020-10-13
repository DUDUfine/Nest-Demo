import {
  Controller,
  UseGuards,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { Mark } from './mark.entity';
import { MarkService } from './mark.service';

@Controller('mark')
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  @Get('list')
  getMarkList(@Query() querys): Promise<[Mark[], number]> {
    return this.markService.getList(querys);
  }

  @Post('add')
  addMark(@Body() mark): Promise<string> {
    var a = JSON.stringify(mark);
    console.log('addMark参数:' + a);
    return this.markService.create(mark);
  }

  // @Delete('delete')
  // deleteTag(@Body() Tag):Promise<string> {
  //     return this.markService.delete(Tag);
  // }

  // @Get('queryById')
  // queryById(@Query() querys):Promise<Mark> | string {
  //     let id = querys.id;
  //     console.log('iquerys:'+JSON.stringify(querys));
  //     console.log('id:'+JSON.stringify(id));
  //     if (!id) {
  //        return 'id为空';
  //     }
  //     return this.TagService.queryById(id)
  // }
}
