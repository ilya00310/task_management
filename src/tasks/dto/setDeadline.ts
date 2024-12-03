import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class setDeadlineDto {
  @ApiProperty({ example: 10, description: 'Id of the task to be set deadline' })
  readonly id: number;

  @ApiProperty({ example: '2025-01-03', description: 'New deadline' })
  readonly deadline: Date;
}
