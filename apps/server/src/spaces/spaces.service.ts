import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Space } from './interfaces/space.interface';
import { CreateSpaceDto } from './dto';

@Injectable()
export class SpacesService {
  constructor(
    @Inject('SPACE_MODEL')
    private spaceModel: Model<Space>,
  ) {}

  async create(createSpaceDto: CreateSpaceDto): Promise<Space> {
    const createdSpace = new this.spaceModel(createSpaceDto);
    return createdSpace.save();
  }

  async delete(id: string): Promise<any> {
    const space: Space = await this.spaceModel.findOne({ _id: id });

    if (!space) {
      throw new NotFoundException({ message: 'Space not found' });
    }
    return this.spaceModel.deleteOne({ _id: id });
  }

  async findAll(): Promise<Space[]> {
    return this.spaceModel.find().exec();
  }
}
