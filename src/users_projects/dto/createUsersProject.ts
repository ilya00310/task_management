import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class CreateUsersProjectsDto {
  @ApiProperty({ example: 12, description: 'User id' })
  readonly user_id: number;

  @ApiProperty({ example: 2, description: 'Project id' })
  readonly project_id: number;
}
