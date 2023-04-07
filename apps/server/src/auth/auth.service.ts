import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { RegisterUserDto } from './dto';
import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.userModel.findOne({ email: user.email });

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists._id,
      email: userExists.email,
    });
  }

  async registerUser(user: RegisterUserDto) {
    try {
      const newUser = await new this.userModel(user).save();

      return this.generateJwt({ sub: newUser._id, email: newUser.email });
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
