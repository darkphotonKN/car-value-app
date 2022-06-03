import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';

// User Service for Business Logic

@Injectable()
export class UsersService {
  // DI for our repo here, of type Users (via generic), and using InjectRepository to make generics work nicely
  // with nestjs' Dependency Injection
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}

  // create a new user
  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // create entity instance of user in the repo
    return this.repo.save(user); // actually add new user to the repository
  }

  // find a single user
  async findOne(id: string) {
    const user = await this.repo.findOne(id);
    return user;
  }

  find() {}

  update() {}

  remove() {}
}
