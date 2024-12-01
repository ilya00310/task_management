import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class CreateProjectDto {
  @ApiProperty({ example: 'onlineShop', description: 'Название проекта' })
  readonly name: string;

  @ApiProperty({ example: '10', description: 'id задачи' })
  readonly task_id: number;

  @ApiProperty({ example: 'создать онлайн магазин', description: 'Описание проекта' })
  readonly description: string;

  @ApiProperty({ example: 'Vlad', description: 'Создатель проекта' })
  readonly creator: string;
}
