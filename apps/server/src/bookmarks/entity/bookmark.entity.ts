import { ApiProperty } from '@nestjs/swagger';

export class BookmarkEntity {
  @ApiProperty({
    example: '642ff272f68f2b39a4a6f7df',
    description: 'Bookmark unique identifier',
  })
  _id: string;

  @ApiProperty({ example: 'https://example.com', description: 'Bookmark url' })
  url: string;

  @ApiProperty({
    example: 'Bookmark description',
    description: 'Bookmark description',
  })
  description: string;

  @ApiProperty({ example: '64318df552f93af0cc9f4779', description: 'Bookmark tag unique identifier' })
  tag: string;

  @ApiProperty({ example: '64318df552f93af0cc9f4779', description: 'Space unique identifier' })
  space: string;

  @ApiProperty({ example: 'yzhbankov@gmail.com', description: 'Email of bookmark owner' })
  owner: string;

  @ApiProperty({
    example: '2023-01-02T12:00:00Z',
    description: 'Date of bookmark creation',
  })
  createdAt: string;

  @ApiProperty({
    example: '2023-01-02T12:00:00Z',
    description: 'Date of bookmark update',
  })
  updatedAt: string;
}
