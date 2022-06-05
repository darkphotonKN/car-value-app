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
  findOne(id: number) {
    const user = this.repo.findOne(id);
    return user;
  }

  // find all users with the criteria passed in
  find(email: string) {
    return this.repo.find({ email });
  }

  // update a single user
  async update(id: number, attrs: Partial<Users>) {
    const currentUser = await this.findOne(id);
    if (currentUser == null) {
      throw new Error('User not found!');
    }
    // const updatedUser = { ...currentUser, ...attrs };
    // using Object.assign to update original user
    Object.assign(currentUser, attrs);
    return this.repo.save(currentUser);
  }

  // find user entity then remove it
  async remove(id: number) {
    // using remove works with entities are allows for tools like hooks
    // to work - using delete() means one less trip to get the entity
    // first but losing out on the hook utilities
    const user = await this.findOne(id); // find a single user entity
    if (user == null) {
      throw new Error('User not found!');
    }
    this.repo.remove(user);
  }
}
