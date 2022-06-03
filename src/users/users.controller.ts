import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup') // extracting Body as an argument, type-checking it for validation with the CreateUserDTO
  async createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    await this.usersService.create(email, password);
    return { status: 200, message: 'User was created!' };
  }
}
