import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { bookmarksProviders } from './bookmarks.providers';
import { spacesProviders } from '../spaces/spaces.providers';
import { databaseProviders } from '../database.providers';

@Module({
  controllers: [BookmarksController],
  providers: [
    BookmarksService,
    ...bookmarksProviders,
    ...databaseProviders,
    ...spacesProviders,
  ],
  exports: [BookmarksService],
})
export class BookmarksModule {}
