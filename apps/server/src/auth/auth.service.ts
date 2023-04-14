import { BadRequestException, Injectable, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
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
      name: userExists.name,
      locale: user.locale,
      picture: user.picture,
    });
  }

  async exchangeCodeForToken(code) {
    try {
      const oAuth2Client = new OAuth2Client(
        this.configService.get<string>('google.clientID'),
        this.configService.get<string>('google.clientSecret'),
        'postmessage',
      );
      const {
        tokens: { id_token },
      } = await oAuth2Client.getToken(code);

      const ticket = await oAuth2Client.verifyIdToken({
        idToken: id_token,
        audience: this.configService.get<string>('google.clientID'),
      });
      const payload = ticket.getPayload();

      return this.signIn(payload);
    } catch (error) {
      throw new HttpException('Code exchange error', HttpStatus.BAD_REQUEST);
    }
  }

  async registerUser(user) {
    try {
      const newUser = await this.usersService.create(user);

      return this.generateJwt({
        sub: newUser._id,
        email: newUser.email,
        name: newUser.name,
        locale: user.locale,
        picture: user.picture,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
