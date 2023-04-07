import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Bookmark } from './interfaces/bookmark.interface';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto';

@Injectable()
export class BookmarksService {
  constructor(
    @Inject('BOOKMARK_MODEL')
    private bookmarkModel: Model<Bookmark>,
  ) {}

  async create(createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    const createdBookmark = new this.bookmarkModel(createBookmarkDto);
    return createdBookmark.save();
  }

  async update(id: string, updateBookmarkDto: UpdateBookmarkDto,): Promise<Bookmark> {
    const bookMark: Bookmark = await this.bookmarkModel.findOne({ _id: id });

    if (!bookMark) {
      throw new NotFoundException({ message: 'Bookmark not found' });
    }
    return this.bookmarkModel.findOneAndUpdate({ _id: id }, updateBookmarkDto, { new: true });
  }

  async delete(id: string): Promise<any> {
    const bookMark: Bookmark = await this.bookmarkModel.findOne({ _id: id });

    if (!bookMark) {
      throw new NotFoundException({ message: 'Bookmark not found' });
    }
    return this.bookmarkModel.deleteOne({ _id: id });
  }

  async findAll(): Promise<Bookmark[]> {
    return this.bookmarkModel.find().exec();
  }
}
