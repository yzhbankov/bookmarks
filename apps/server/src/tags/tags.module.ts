import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { tagsProviders } from './tags.providers';
import { bookmarksProviders } from '../bookmarks/bookmarks.providers';
import { databaseProviders } from '../database.providers';

@Module({
  controllers: [TagsController],
  providers: [
    TagsService,
    ...tagsProviders,
    ...databaseProviders,
    ...bookmarksProviders,
  ],
})
export class TagsModule {}
