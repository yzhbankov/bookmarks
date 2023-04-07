import { Controller, Post, Get, Body } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto';
import { Bookmark } from './interfaces/bookmark.interface';
import { BookmarkEntity } from './entity/bookmark.entity';

@ApiBearerAuth()
@ApiTags('bookmarks')
@Controller({
  path: 'bookmarks',
  version: '1',
})
export class BookmarksController {
  constructor(private readonly appService: BookmarksService) {}

  @Post()
  @ApiOperation({ summary: 'Create event' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 422, description: 'Validation error.' })
  @ApiResponse({
    status: 200,
    description: 'Created bookmark',
    type: BookmarkEntity,
  })
  async saveBookmark(
    @Body() createEventDto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    return this.appService.create(createEventDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found bookmarks',
    type: [BookmarkEntity],
  })
  async readBookmark(): Promise<Bookmark[]> {
    return this.appService.findAll();
  }
}
