import { Controller, Post, Delete, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto';
import { TagEntity } from './entity/tag.entity';
import { Tag } from './interfaces/tag.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  async saveTag(@Req() req, @Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.appService.create(req.user.email, createTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete tag' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 422, description: 'Validation error.' })
  @ApiResponse({
    status: 204,
    description: 'Delete tag',
  })
  @UseGuards(JwtAuthGuard)
  async deleteTag(@Req() req, @Param() params): Promise<any> {
    await this.appService.delete(req.user.email, params.id);
    return {};
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found tags',
    type: [TagEntity],
  })
  @UseGuards(JwtAuthGuard)
  async readTags(@Req() req): Promise<Tag[]> {
    return this.appService.findAll(req.user.email);
  }
}
