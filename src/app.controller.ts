import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as APP_CONFIG from './app.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return JSON.stringify(APP_CONFIG.INFO) ;
  }


  @Get('getHello')
  getHello(): string {
    return this.appService.getHello();
  }
}
