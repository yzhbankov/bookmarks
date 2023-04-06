import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto';


@ApiBearerAuth()
@ApiTags('bookmarks')
@Controller('bookmarks')
export class BookmarksController {
    constructor(private readonly appService: BookmarksService) {}

    @Post()
    @ApiOperation({ summary: 'Create event' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 422, description: 'Validation error.' })
    async saveBookmark(@Body() createEventDto: CreateBookmarkDto): Promise<string> {
        return this.appService.save(createEventDto)
    }

    @Get()
    @ApiResponse({ status: 200, description: 'The found events', type: [Event] })
    async readBookmark(): Promise<string> {
        return this.appService.read()
    }
}
