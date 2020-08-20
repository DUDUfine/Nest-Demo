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
import { isDevMode } from '../app.environment';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const request = context.switchToHttp().getRequest();
    const content = request.method + ' -> ' + request.url;
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`请求响应： ${content} ${Date.now() - now}ms`)),
      );
  }
}
