import { IsString, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookmarkDto {
  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsMongoId()
  space: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional()
  tag: string;
}
