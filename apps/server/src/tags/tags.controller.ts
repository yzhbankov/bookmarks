import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto';
import { TagEntity } from './entity/tag.entity';
import { Tag } from './interfaces/tag.interface';

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
  async readTags(): Promise<Tag[]> {
    return this.appService.findAll();
  }
}
