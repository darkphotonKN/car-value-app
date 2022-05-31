import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UsersController {
  @Post('signup') // extracting Body as an argument, type-checking it for validation with the CreateUserDTO
  createUser(@Body() body: CreateUserDto) {}
}
