import { Controller, Post, Put, Delete, Get, Body, Param, } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto';
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
  @ApiOperation({ summary: 'Create bookmark' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 422, description: 'Validation error.' })
  @ApiResponse({
    status: 200,
    description: 'Created bookmark',
    type: BookmarkEntity,
  })
  async saveBookmark(
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    return this.appService.create(createBookmarkDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit bookmark' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 422, description: 'Validation error.' })
  @ApiResponse({
    status: 200,
    description: 'Created bookmark',
    type: BookmarkEntity,
  })
  async editBookmark(@Param() params, @Body() editBookmarkDto: UpdateBookmarkDto): Promise<Bookmark> {
    return this.appService.update(params.id, editBookmarkDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete bookmark' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 422, description: 'Validation error.' })
  @ApiResponse({
    status: 204,
    description: 'Delete bookmark',
  })
  async deleteBookmark(@Param() params): Promise<any> {
    await this.appService.delete(params.id);
    return {};
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found bookmarks',
    type: [BookmarkEntity],
  })
  async readBookmarks(): Promise<Bookmark[]> {
    return this.appService.findAll();
  }
}
