import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response } from 'express';
// import * as moment from 'moment';
var moment = require('moment');
import { Logger } from '../utils/log4js';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const code = res.statusCode; // 响应状态码
    next();
    // 组装日志信息
    const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    时间: ${moment(new Date()).format('YYYY-MM-DD HH:mm')}
    请求url: ${req.originalUrl}
    请求方法: ${req.method}
    请求IP: ${req.ip}
    请求状态code: ${code}
    请求参数paramas: ${JSON.stringify(req.params)}
    请求参数Query: ${JSON.stringify(req.query)}
    请求体Body: ${JSON.stringify(req.body)}
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat);
    } else if (code >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }
  }
}
