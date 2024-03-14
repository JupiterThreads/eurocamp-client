import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor {
  intercept(context, next) {
    return next.handle().pipe(
      map((res: any) => {
        if (res && res.hasOwnProperty('data')) {
          return res.data;
        }
        return res;
      }),
    );
  }
}
