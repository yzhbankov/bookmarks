import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { usersProviders } from './users.providers';
import { GoogleStrategy, JwtStrategy } from './strategies';
import { databaseProviders } from '../database.providers';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // secret: configService.get<string>('jwt.secret'),
        secret: 'secertrsdfdfs',
        signOptions: { expiresIn: '600s' },
      }),
      inject: [ConfigService],
    }),
  ],
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
