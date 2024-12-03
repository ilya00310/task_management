import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class updateTaskDto {
  @ApiProperty({ example: 10, description: 'Id задачи' })
  readonly id: string;

  @ApiProperty({ example: 'Аутентификация', description: 'Новое название задачи' })
  readonly name: string;

  @ApiProperty({ example: 'Реализовать аутентификацию', description: 'Новое описание задачи' })
  readonly description: string;
}
