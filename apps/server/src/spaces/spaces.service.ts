import { Model, Types } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Space } from './interfaces/space.interface';
import { CreateSpaceDto } from './dto';

@Injectable()
export class SpacesService {
  constructor(
    @Inject('SPACE_MODEL')
    private spaceModel: Model<Space>,
  ) {}

  async create(owner: string, createSpaceDto: CreateSpaceDto): Promise<Space> {
    const createdSpace = new this.spaceModel({ ...createSpaceDto, owner });
    return createdSpace.save();
  }

  async delete(owner: string, id: string): Promise<any> {
    const objectId = new Types.ObjectId(id);
    const space: Space = await this.spaceModel.findOne({ _id: objectId, owner });

    if (!space) {
      throw new NotFoundException({ message: 'Space not found' });
    }
    return this.spaceModel.deleteOne({ _id: objectId });
  }

  async findAll(owner: string): Promise<Space[]> {
    return this.spaceModel.find({ owner }).exec();
  }

  async findByIdAndEmail(id: string, email: string): Promise<Space> {
    const objectId = new Types.ObjectId(id);
    return this.spaceModel.findOne({ _id: objectId, owner: email }).exec();
  }
}
