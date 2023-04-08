import { IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookmarkDto {
  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  tag: string;
}
