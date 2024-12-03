import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class UpdateProjectDto {
  @ApiProperty({ example: 2, description: 'Id проекта' })
  readonly project_id: number;

  @ApiProperty({ example: 'onlineShop', description: 'Новое название проекта' })
  readonly name: string;

  @ApiProperty({ example: 'создать онлайн магазин', description: 'Новое описание проекта' })
  readonly description: string;
}
