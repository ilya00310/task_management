import { ApiProperty } from '@nestjs/swagger';
export class setDeadlineDto {
  @ApiProperty({ example: '2025-01-03', description: 'New deadline' })
  readonly deadline: Date;
}
