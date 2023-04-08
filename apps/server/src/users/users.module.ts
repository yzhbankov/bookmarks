import { Module } from '@nestjs/common';
import { SpacesModule } from '../spaces/spaces.module';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { databaseProviders } from '../database.providers';

@Module({
  imports: [SpacesModule],
  providers: [UsersService, ...usersProviders, ...databaseProviders],
  exports: [UsersService],
})
export class UsersModule {}
