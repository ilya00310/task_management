import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class setStatusDto {
  @ApiProperty({ example: 10, description: 'Id of the task to be set status' })
  readonly id: number;

  @ApiProperty({ example: false, description: 'New status' })
  readonly status: boolean;
}
