import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]), // this is what created the repository for us, via this custom made Entity
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
