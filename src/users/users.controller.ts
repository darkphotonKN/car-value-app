import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // signs up user
  @Post('/signup') // extracting Body as an argument, type-checking it for validation with the CreateUserDTO
  async createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    await this.usersService.create(email, password);
    return { status: 200, message: 'User was created!' };
  }

  // gets data on a single user
  @Get('/user/:id')
  async findUser(@Param('id') id: string) {
    // decorator grabs the id query out and sticks it into the parameter
    console.log('Param:', id);
    return await this.usersService.findOne(id);
  }

  // find all users based on email
  @Get('/user')
  async findUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  // updates a single user
  @Patch('user')
  async updateUser(@Body() body: UpdateUserDto) {
    if (body == null) {
      return { msg: 'no body provided!' };
    }
    return await this.usersService.update(body.id, body.user);
  }

  // deletes a single user
  @Get('/deleteUser/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
