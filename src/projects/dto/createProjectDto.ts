import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class CreateProjectDto {
  @ApiProperty({ example: 'onlineShop', description: 'Название проекта' })
  readonly name: string;

  @ApiProperty({ example: 'создать онлайн магазин', description: 'Описание проекта' })
  readonly description: string;

  @ApiProperty({ example: 1, description: 'Создатель проекта' })
  readonly creator_id: number;
}
