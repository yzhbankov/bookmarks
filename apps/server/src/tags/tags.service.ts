import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Tag } from './interfaces/tag.interface';
import { CreateTagDto } from './dto';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TAG_MODEL')
    private tagModel: Model<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.tagModel(createTagDto);
    return createdTag.save();
  }

  async delete(id: string): Promise<any> {
    const tag: Tag = await this.tagModel.findOne({ _id: id });

    if (!tag) {
      throw new NotFoundException({ message: 'Tag not found' });
    }
    return this.tagModel.deleteOne({ _id: id });
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }
}
