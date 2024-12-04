import { ApiProperty } from '@nestjs/swagger';
export class setStatusDto {
  @ApiProperty({ example: false, description: 'New status' })
  readonly status: boolean;
}
