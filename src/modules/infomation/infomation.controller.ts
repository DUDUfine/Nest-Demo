import { Controller, UseGuards, Get, Put, Post, Delete, Body, Query, Param } from '@nestjs/common';
import { Infomation } from './infomation.entity';
import { InfomationService } from './infomation.service';
import { resolve } from 'dns';

@Controller('infomation')
export class InfomationController { 
    constructor(private readonly InfomationService: InfomationService) {}
    
    @Get('list')
    getCategories(@Query() querys): Promise<[Infomation[],number]> {
        return this.InfomationService.getList(querys);
    }

    @Post('add')
    addInfomation(@Body() Infomation):Promise<string> {
        return this.InfomationService.create(Infomation);
    }

    @Delete('delete')
    deleteInfomation(@Body() Infomation):Promise<string> {
        return this.InfomationService.delete(Infomation);
    }

    @Get('queryById')
    queryById(@Query() querys):Promise<Infomation> | string {
        let id = querys.id;
        console.log('iquerys:'+JSON.stringify(querys));  
        console.log('id:'+JSON.stringify(id));
        if (!id) {
           return 'id为空';
        }
        return this.InfomationService.queryById(id)
    }

}
