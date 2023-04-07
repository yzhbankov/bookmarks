import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto';
import { SpaceEntity } from './entity/space.entity';
import { Space } from './interfaces/space.interface';

@ApiBearerAuth()
@ApiTags('spaces')
@Controller({
  path: 'spaces',
  version: '1',
})
export class SpacesController {
  constructor(private readonly appService: SpacesService) {}

  @Post()
  @ApiOperation({ summary: 'Create space' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 422, description: 'Validation error.' })
  @ApiResponse({
    status: 200,
    description: 'Created space',
    type: SpaceEntity,
  })
  async saveSpace(@Body() createSpaceDto: CreateSpaceDto): Promise<Space> {
    return this.appService.create(createSpaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete space' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 422, description: 'Validation error.' })
  @ApiResponse({
    status: 204,
    description: 'Delete space',
  })
  async deleteSpace(@Param() params): Promise<any> {
    await this.appService.delete(params.id);
    return {};
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found spaces',
    type: [SpaceEntity],
  })
  async readSpaces(): Promise<Space[]> {
    return this.appService.findAll();
  }
}
