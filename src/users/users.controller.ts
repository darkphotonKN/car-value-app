import {
  Body,
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Param,
  Query,
  UseInterceptors,
  // ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
// custom serialize interceptor
import {
  Serialize,
  SerializeInterceptor,
} from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // signs up user
  @Post('/signup') // extracting Body as an argument, type-checking it for validation with the CreateUserDTO
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    this.usersService.create(email, password);
    return { status: 200, message: 'User was created!' };
  }

  // gets data on a single user
  // NestJS docs recommended way, but ill build a custom method that
  // will prove to be more flexible
  // @UseInterceptors(ClassSerializerInterceptor) // serializes the response from using GET
  // custom interceptor
  // @Serialize(UserDto) // moved this to top level as the entire controller handles users
  @Get('/user/:id')
  async findUser(@Param('id') id: string) {
    // decorator grabs the id query out and sticks it into the parameter
    console.log('Attempting to find user');
    return await this.usersService.findOne(parseInt(id));
  }

  // find all users based on email
  @Get('/user')
  async findUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  // updates a single user
  @Patch('/user/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    if (body == null) {
      return { msg: 'no body provided!' };
    }
    console.log('Updating user body:', body);
    return await this.usersService.update(parseInt(id), body);
  }

  // deletes a single user
  @Delete('/deleteUser/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id));
  }
}
