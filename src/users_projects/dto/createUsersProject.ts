import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class CreateUsersProjectsDto {
  @ApiProperty({ example: 12, description: 'Id пользователя' })
  readonly user_id: number;

  @ApiProperty({ example: 2, description: 'Id проекта' })
  readonly project_id: number;
}
