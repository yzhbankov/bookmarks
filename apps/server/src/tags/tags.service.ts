import { Model, Types } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Tag } from './interfaces/tag.interface';
import { CreateTagDto } from './dto';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TAG_MODEL')
    private tagModel: Model<Tag>,
  ) {}

  async create(owner: string, createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.tagModel({ ...createTagDto, owner });
    return createdTag.save();
  }

  async delete(owner: string, id: string): Promise<any> {
    const objectId = new Types.ObjectId(id);
    const tag: Tag = await this.tagModel.findOne({ _id: objectId, owner });

    if (!tag) {
      throw new NotFoundException({ message: 'Tag not found' });
    }
    // todo: removing tag update all bookmarks
    return this.tagModel.deleteOne({ _id: objectId });
  }

  async findAll(owner: string): Promise<Tag[]> {
    return this.tagModel.find({ owner }).exec();
  }
}
