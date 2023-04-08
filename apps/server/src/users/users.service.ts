import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async findUser(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async create(user: CreateUserDto): Promise<User> {
    return new this.userModel(user).save();
  }
}
