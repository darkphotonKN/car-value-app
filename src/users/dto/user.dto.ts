import { Expose } from 'class-transformer';

// used to serialize response values to filter out unwanted values
export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
