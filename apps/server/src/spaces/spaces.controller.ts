import { Controller, Post, Delete, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto';
import { SpaceEntity } from './entity/space.entity';
import { Space } from './interfaces/space.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  async saveSpace(@Req() req, @Body() createSpaceDto: CreateSpaceDto): Promise<Space> {
    return this.appService.create(req.user.email, createSpaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete space' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 422, description: 'Validation error.' })
  @ApiResponse({
    status: 204,
    description: 'Delete space',
  })
  @UseGuards(JwtAuthGuard)
  async deleteSpace(@Req() req, @Param() params): Promise<any> {
    await this.appService.delete(req.user.email, params.id);
    return {};
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found spaces',
    type: [SpaceEntity],
  })
  @ApiOperation({ summary: 'Read spaces' })
  @UseGuards(JwtAuthGuard)
  async readSpaces(@Req() req): Promise<Space[]> {
    return this.appService.findAll(req.user.email);
  }
}
