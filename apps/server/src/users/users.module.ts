import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { databaseProviders } from '../database.providers';

@Module({
  providers: [UsersService, ...usersProviders, ...databaseProviders],
  exports: [UsersService],
})
export class UsersModule {}
