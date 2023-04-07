import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { usersProviders } from './users.providers';
import { GoogleStrategy, JwtStrategy } from './strategies';
import { databaseProviders } from '../database.providers';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    ...usersProviders,
    ...databaseProviders,
    GoogleStrategy,
    JwtStrategy,
    JwtService,
  ],
})
export class AuthModule {}
