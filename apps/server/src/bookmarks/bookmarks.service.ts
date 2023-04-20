import { Model, Types } from 'mongoose';
import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Bookmark } from './interfaces/bookmark.interface';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto';
import { Space } from '../spaces/interfaces/space.interface';

@Injectable()
export class BookmarksService {
  constructor(
    @Inject('BOOKMARK_MODEL')
    private bookmarkModel: Model<Bookmark>,
    @Inject('SPACE_MODEL')
    private spaceModel: Model<Space>,
  ) {}

  async create(
    owner: string,
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    const objectId = new Types.ObjectId(createBookmarkDto.space);
    const space = await this.spaceModel
      .findOne({ _id: objectId, owner })
      .exec();

    if (!space) {
      throw new ForbiddenException({ message: 'Invalid space provided' });
    }
    const createdBookmark = new this.bookmarkModel({
      ...createBookmarkDto,
      owner,
    });
    return createdBookmark.save();
  }

  async update(
    owner: string,
    id: string,
    updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<Bookmark> {
    const objectId = new Types.ObjectId(id);
    const bookMark: Bookmark = await this.bookmarkModel.findOne({
      _id: objectId,
      owner,
    });
    if (!bookMark) {
      throw new NotFoundException({ message: 'Bookmark not found' });
    }
    return this.bookmarkModel.findOneAndUpdate(
      { _id: objectId },
      updateBookmarkDto,
      { new: true },
    );
  }

  async delete(owner: string, id: string): Promise<any> {
    const objectId = new Types.ObjectId(id);
    const bookMark: Bookmark = await this.bookmarkModel.findOne({
      _id: objectId,
      owner,
    });

    if (!bookMark) {
      throw new NotFoundException({ message: 'Bookmark not found' });
    }
    return this.bookmarkModel.deleteOne({ _id: objectId });
  }

  async deleteAllInSpace(owner: string, spaceId: string): Promise<any> {
    const objectId = new Types.ObjectId(spaceId);
    return this.bookmarkModel.deleteMany({ owner, space: objectId });
  }

  async findAll(owner: string): Promise<Bookmark[]> {
    return this.bookmarkModel.find({ owner }).exec();
  }
}
