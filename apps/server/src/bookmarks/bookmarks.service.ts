import { Model } from 'mongoose';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Bookmark } from './interfaces/bookmark.interface';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class CatsService {
    constructor(
        @Inject('BOOKMARK_MODEL')
        private bookmarkModel: Model<Bookmark>,
    ) {}

    async create(createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
        const createdBookmark = new this.bookmarkModel(createBookmarkDto);
        return createdBookmark.save();
    }

    async findAll(): Promise<Bookmark[]> {
        return this.bookmarkModel.find().exec();
    }
}
