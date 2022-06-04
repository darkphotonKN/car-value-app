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
  findOne(id: string) {
    const user = this.repo.findOne(id);
    return user;
  }

  // find all users with the criteria passed in
  find(email: string) {
    return this.repo.find({ email });
  }

  // update a single user
  async update(id: string, attrs: Partial<Users>) {
    const currentUser = await this.findOne(id);
    if (currentUser == null) {
      throw new Error('User not found!');
    }
    // const updatedUser = { ...currentUser, ...attrs };
    // using Object.assign to update original user
    Object.assign(currentUser, attrs);
    return this.repo.save(currentUser);
  }

  remove() {}
}
