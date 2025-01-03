import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { plainToClassFromExist } from 'class-transformer';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  new (...args: any[]): {};
}

export function Serialize<T extends ClassConstructor>(dto: T) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((data: T) => {
        return plainToClassFromExist(this.dto, data, {
          excludeExtraneousValues: true
        });
      })
    );
  }
}
