import { Model, startSession } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { SpacesService } from '../spaces/spaces.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private spacesService: SpacesService,
  ) {}

  async findUser(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async create(user: CreateUserDto): Promise<User> {
    const session = await startSession();
    const newUser = await session.withTransaction(async () => {
      const createdUser = await new this.userModel(user).save();
      await this.spacesService.create(user.email, { name: 'Default', description: '' });
      return createdUser;
    });
    await session.commitTransaction();

    return newUser as User;
  }
}
