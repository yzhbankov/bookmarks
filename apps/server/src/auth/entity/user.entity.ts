import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({
    example: '642ff272f68f2b39a4a6f7df',
    description: 'User unique identifier',
  })
  _id: string;

  @ApiProperty({ example: 'Ihor', description: 'User name' })
  name: string;

  @ApiProperty({
    example: 'ihor@gmail.com',
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    example: '2023-01-02T12:00:00Z',
    description: 'Date of tag creation',
  })
  createdAt: string;
}
