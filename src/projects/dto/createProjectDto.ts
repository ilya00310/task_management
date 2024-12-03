import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class CreateProjectDto {
  @ApiProperty({ example: 'online_shop', description: 'Project name' })
  readonly name: string;

  @ApiProperty({ example: 'Create online shop', description: 'Project description' })
  readonly description: string;

  @ApiProperty({ example: 1, description: 'Project creator' })
  readonly creator_id: number;
}
