import { Controller, Post, Delete, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto';
import { TagEntity } from './entity/tag.entity';
import { Tag } from './interfaces/tag.interface';
import { GoogleOauthGuard } from '../auth/guards/google-oauth.guard';

@ApiBearerAuth()
@ApiTags('tags')
@Controller({
  path: 'tags',
  version: '1',
})
export class TagsController {
  constructor(private readonly appService: TagsService) {}

  @Post()
  @ApiOperation({ summary: 'Create tag' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 422, description: 'Validation error.' })
  @ApiResponse({
    status: 200,
    description: 'Created tag',
    type: TagEntity,
  })
  @UseGuards(GoogleOauthGuard)
  async saveTag(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.appService.create(createTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete tag' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 422, description: 'Validation error.' })
  @ApiResponse({
    status: 204,
    description: 'Delete tag',
  })
  @UseGuards(GoogleOauthGuard)
  async deleteTag(@Param() params): Promise<any> {
    await this.appService.delete(params.id);
    return {};
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found tags',
    type: [TagEntity],
  })
  @UseGuards(GoogleOauthGuard)
  async readTags(): Promise<Tag[]> {
    return this.appService.findAll();
  }
}
