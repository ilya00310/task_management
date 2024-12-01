import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class setDeadlineDto {
  @ApiProperty({ example: 10, description: 'Id изменяемой задачи' })
  readonly id: number;

  @ApiProperty({ example: false, description: 'Новый дедлайн задачи' })
  readonly deadline: Date;
}
