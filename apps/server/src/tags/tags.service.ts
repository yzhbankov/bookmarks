import { Model, startSession, Types } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Tag } from './interfaces/tag.interface';
import { CreateTagDto } from './dto';
import { Bookmark } from '../bookmarks/interfaces/bookmark.interface';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TAG_MODEL')
    private tagModel: Model<Tag>,
    @Inject('BOOKMARK_MODEL')
    private bookmarkModel: Model<Bookmark>,
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
    const session = await startSession();
    await session.withTransaction(async () => {
      await this.bookmarkModel
        .updateMany(
          { owner, tag: objectId },
          { $set: { tag: null, updatedAt: new Date() } },
          { new: true },
        )
        .exec();

      await this.tagModel.deleteOne({ _id: objectId });
    });
    await session.commitTransaction();
    return null;
  }

  async findAll(owner: string): Promise<Tag[]> {
    return this.tagModel.find({ owner }).exec();
  }
}
