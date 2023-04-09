import { Model, startSession, Types } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { BookmarksService } from '../bookmarks/bookmarks.service';
import { Space } from './interfaces/space.interface';
import { CreateSpaceDto } from './dto';

@Injectable()
export class SpacesService {
  constructor(
    @Inject('SPACE_MODEL')
    private spaceModel: Model<Space>,
    private bookmarksService: BookmarksService,
  ) {}

  async create(owner: string, createSpaceDto: CreateSpaceDto): Promise<Space> {
    const createdSpace = new this.spaceModel({ ...createSpaceDto, owner });
    return createdSpace.save();
  }

  async delete(owner: string, id: string): Promise<any> {
    const objectId = new Types.ObjectId(id);
    const space: Space = await this.spaceModel.findOne({
      _id: objectId,
      owner,
    });
    if (!space) {
      throw new NotFoundException({ message: 'Space not found' });
    }
    const session = await startSession();
    await session.withTransaction(async () => {
      await this.bookmarksService.deleteAllInSpace(owner, id);
      await this.spaceModel.deleteOne({ _id: objectId });
    });
    await session.commitTransaction();
    return null;
  }

  async findAll(owner: string): Promise<Space[]> {
    return this.spaceModel.find({ owner }).exec();
  }
}
