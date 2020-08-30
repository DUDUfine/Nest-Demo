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

export interface Response<T> {
  data: T;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const request = context.switchToHttp().getRequest();
    const reqContent = request.method + ' -> ' + request.url;
    const now = Date.now();
    const response1 = context.switchToHttp().getResponse();
    // console.log(response1);
    console.log('----------------');
    
    return next
      .handle()
      .pipe(
        tap(() => {
          const response = context.switchToHttp().getResponse();
          // console.log(response);
          console.log(`响应码：statusCode——${response.statusCode} body:${response.body}\n 请求：${reqContent} ; 响应时间：${Date.now() - now}ms`)
        }),
      );
  }
}
