import { ApiProperty } from '@nestjs/swagger';

export class SpaceEntity {
  @ApiProperty({
    example: '642ff272f68f2b39a4a6f7df',
    description: 'Space unique identifier',
  })
  _id: string;

  @ApiProperty({ example: 'Work', description: 'Space name' })
  name: string;

  @ApiProperty({
    example: 'Space description',
    description: 'Space description',
  })
  description: string;

  @ApiProperty({ example: 'yzhbankov@gmail.com', description: 'Space owner email' })
  owner: string;

  @ApiProperty({
    example: '2023-01-02T12:00:00Z',
    description: 'Date of space creation',
  })
  createdAt: string;
}
