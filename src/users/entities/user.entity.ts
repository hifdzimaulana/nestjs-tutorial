import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    required: false,
    oneOf: [{ type: 'number' }, { type: 'string' }],
  })
  phone?: string | number;

  @ApiProperty({ required: false })
  address?: string;
}
