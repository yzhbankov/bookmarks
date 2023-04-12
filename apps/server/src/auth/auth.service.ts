import { BadRequestException, Injectable, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { RegisterUserDto } from './dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.usersService.findUser(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists._id,
      email: userExists.email,
    });
  }

  async exchangeCodeForToken(code) {
    try {
      const oAuth2Client = new OAuth2Client(
        this.configService.get<string>('google.clientID'),
        this.configService.get<string>('google.clientSecret'),
        'postmessage',
      );
      const { tokens } = await oAuth2Client.getToken(code);
      const tokenInfo = await oAuth2Client.getTokenInfo(tokens.access_token);

      return this.signIn(tokenInfo);
    } catch (error) {
      throw new HttpException('Code exchange error', HttpStatus.BAD_REQUEST);
    }
  }

  async registerUser(user: RegisterUserDto) {
    try {
      const newUser = await this.usersService.create(user);

      return this.generateJwt({ sub: newUser._id, email: newUser.email });
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
