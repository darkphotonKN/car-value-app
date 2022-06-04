import { IsString, IsEmail, IsObject } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  id: string;

  @IsObject()
  user: {
    email: string;
  };
}
