import { Expose } from 'class-transformer';

// used to serialize response values to filter out unwanted values
// only @Expose() marked values are shown in request response
export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
