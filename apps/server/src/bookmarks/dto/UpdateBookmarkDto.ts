import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookmarkDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  tag: string;
}
