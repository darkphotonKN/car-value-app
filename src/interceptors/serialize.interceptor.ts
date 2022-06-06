import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    // run something before a request is handled by the request handler
    console.log('Before request is handled');
    return handler.handle().pipe(
      map((data: any) => {
        // data is a User Entity
        // do somethign before response is sent out
        console.log('Doing somethign before response is sent out:', data);
        // turning User Entity into a user DTO - allow seriazliation
        return plainToClass(
          UserDto,
          data,
          // options - excludeExtraneousValues allows every field
          // in a DTO to be serialized UNLESS IT IS MARKED AS
          // EXPOSED (in the DTO file @Expose())
          {
            excludeExtraneousValues: true,
          },
        );
      }),
    );
  }
}
