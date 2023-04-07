import { Module } from '@nestjs/common';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';
import { databaseProviders } from '../database.providers';
import { spacesProviders } from './spaces.providers';

@Module({
  controllers: [SpacesController],
  providers: [SpacesService, ...databaseProviders, ...spacesProviders],
})
export class SpacesModule {}
