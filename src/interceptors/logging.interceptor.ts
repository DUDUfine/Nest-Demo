/**
 * @author DUDUfine
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { isDevMode } from '../app.environment';
import { Logger } from '../utils/log4js';
// import * as moment from 'moment';
var moment = require('moment');

export interface Response<T> {
  data: T;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap((data) => {
        const request = context.switchToHttp().getRequest();
        // 组装日志信息
        const code = request.statusCode; // 响应状态码
        const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          时间: ${moment(new Date()).format('YYYY-MM-DD HH:mm')}
          请求url: ${request.originalUrl}
          请求方法: ${request.method}
          请求IP: ${request.ip}
          请求状态code: ${code}
          请求参数paramas: ${JSON.stringify(request.params)}
          请求参数Query: ${JSON.stringify(request.query)}
          请求体Body: ${JSON.stringify(request.body)}
          响应内容: ${data}
          响应时间：${Date.now() - now}ms
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
      }),
    );
  }
}
