import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class UpdateProjectDto {
  @ApiProperty({ example: 2, description: 'Project_id' })
  readonly project_id: number;

  @ApiProperty({ example: 'website', description: 'New project name' })
  readonly name: string;

  @ApiProperty({ example: 'Create website', description: 'New project description' })
  readonly description: string;
}
