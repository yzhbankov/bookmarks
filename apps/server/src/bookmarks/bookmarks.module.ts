import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { bookmarksProviders } from './bookmarks.providers';
import { databaseProviders } from '../database.providers';
import { SpacesModule } from '../spaces/spaces.module';

@Module({
  imports: [SpacesModule],
  controllers: [BookmarksController],
  providers: [BookmarksService, ...bookmarksProviders, ...databaseProviders],
})
export class BookmarksModule {}
