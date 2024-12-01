import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class setStatusDto {
  @ApiProperty({ example: 10, description: 'Id изменяемой задачи' })
  readonly id: number;

  @ApiProperty({ example: false, description: 'Новый статус задачи' })
  readonly status: boolean;
}
