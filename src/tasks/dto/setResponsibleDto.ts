import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class setResponsibleDto {
  @ApiProperty({ example: 10, description: 'Id изменяемой задачи' })
  readonly id: number;

  @ApiProperty({ example: false, description: 'Новый ответсвенный задачи' })
  readonly responsible_id: number;
}
