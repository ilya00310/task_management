import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class setResponsibleDto {
  @ApiProperty({ example: 10, description: 'Id изменяемой задачи' })
  readonly id: number;

  @ApiProperty({ example: 2, description: 'Id ответсвенного за задачу' })
  readonly responsible_id: number;
}
