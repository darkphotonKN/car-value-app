import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // signs up user
  @Post('signup') // extracting Body as an argument, type-checking it for validation with the CreateUserDTO
  async createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    await this.usersService.create(email, password);
    return { status: 200, message: 'User was created!' };
  }

  // gets data on a single user
  @Get('user')
  async getUsers(@Query('id') id: string) {
    console.log('Query:', id);
    return await this.usersService.findOne(id);
  }

  // updates a single user
  @Post('user')
  async updateUser(@Body() body: UpdateUserDto) {
    if (body == null) {
      return { msg: 'no body provided!' };
    }
    return await this.usersService.update(body.id, body.user);
  }
}
