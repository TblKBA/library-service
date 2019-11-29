import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogService } from '../logger/log.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res: Response = context.switchToHttp().getResponse();
    const req: Request = context.switchToHttp().getRequest();
    return next.handle()
      .pipe(
        tap(r => {
          return this.logService.add({
            status: (res as any).statusCode,
            reqHeaders: req.headers,
            reqBody: req.body,
            resHeaders: (res as any).getHeaders(),
            resBody: r,
            path: req.url,
            date: new Date(),
            method: req.method,
          });
        }),
        catchError(err => {
            this.logService.add({
              status: err.message.statusCode,
              reqHeaders: req.headers,
              reqBody: req.body,
              resHeaders: (res as any).getHeaders(),
              resBody: err.message,
              path: req.url,
              date: new Date(),
              method: req.method,
            });
            return of(err.message);
          },
        ));
  }

}
