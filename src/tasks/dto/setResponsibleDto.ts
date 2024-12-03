import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class setResponsibleDto {
  @ApiProperty({ example: 10, description: 'Id of the task to be set responsible' })
  readonly id: number;

  @ApiProperty({ example: 2, description: 'New responsible id' })
  readonly responsible_id: number;
}
