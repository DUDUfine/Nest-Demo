import { Controller, UseGuards, Get, Put, Post, Delete, Body, Query, Param } from '@nestjs/common';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController { 
    constructor(private readonly TagService: TagService) {}
    
    @Get('list')
    getCategories(@Query() querys): Promise<[Tag[],number]> {
        return this.TagService.getList(querys);
    }

    @Post('add')
    addTag(@Body() Tag):Promise<string> {
        var a = JSON.stringify(Tag) ;
        console.log('addTag参数:'+a);
        return this.TagService.create(Tag);
    }

    @Delete('delete')
    deleteTag(@Body() Tag):Promise<string> {
        return this.TagService.delete(Tag);
    }

    @Get('queryById')
    queryById(@Query() querys):Promise<Tag> | string {
        let id = querys.id;
        console.log('iquerys:'+JSON.stringify(querys));  
        console.log('id:'+JSON.stringify(id));
        if (!id) {
           return 'id为空';
        }
        return this.TagService.queryById(id)
    }

}
