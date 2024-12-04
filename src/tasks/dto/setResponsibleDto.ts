import { ApiProperty } from '@nestjs/swagger';
export class setResponsibleDto {
  @ApiProperty({ example: 10, description: 'Id of the task to be set responsible' })
  readonly user_id: number;
}
