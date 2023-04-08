import { Model, startSession } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { SpacesService } from '../spaces/spaces.service';
import { CreateUserDto, UpdateUserDto } from './dto';

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

  async update(user: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ email: user.email }, user, {
      new: true,
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    const session = await startSession();
    const newUser = await session.withTransaction(async () => {
      const createdUser = await new this.userModel(user).save();
      await this.spacesService.create({ name: 'Default', description: '', owner: user.email });
      return createdUser;
    });
    await session.commitTransaction();

    return newUser as User;
  }
}
