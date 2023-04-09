import { Module } from '@nestjs/common';
import { BookmarksModule } from '../bookmarks/bookmarks.module';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';
import { databaseProviders } from '../database.providers';
import { spacesProviders } from './spaces.providers';

@Module({
  imports: [BookmarksModule],
  controllers: [SpacesController],
  providers: [SpacesService, ...databaseProviders, ...spacesProviders],
  exports: [SpacesService],
})
export class SpacesModule {}
