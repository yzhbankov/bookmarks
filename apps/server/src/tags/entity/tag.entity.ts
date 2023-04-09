import { ApiProperty } from '@nestjs/swagger';

export class TagEntity {
  @ApiProperty({
    example: '642ff272f68f2b39a4a6f7df',
    description: 'Tag unique identifier',
  })
  _id: string;

  @ApiProperty({ example: 'Work', description: 'Tag name' })
  name: string;

  @ApiProperty({
    example: 'Tag description',
    description: 'Tag description',
  })
  description: string;

  @ApiProperty({ example: 'yzhbankov@gmail.com', description: 'Tag owner email' })
  owner: string;

  @ApiProperty({
    example: '2023-01-02T12:00:00Z',
    description: 'Date of tag creation',
  })
  createdAt: string;
}
