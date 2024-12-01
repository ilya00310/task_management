import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class CreateTaskDto {
  @ApiProperty({ example: 'Аутентификация', description: 'Название задачи' })
  readonly name: string;

  @ApiProperty({ example: 'Реализовать аутентификацию', description: 'Описание задачи' })
  readonly description: string;

  @ApiProperty({ example: 10, description: 'Id ответсвенного пользователя' })
  readonly responsible_id: number;

  @ApiProperty({ example: '2024-01-12', description: 'Дедлайн задачи' })
  readonly deadline: Date;

  @ApiProperty({ example: 'completed', description: 'Статус выполнения задачи' })
  readonly status: boolean;
}
