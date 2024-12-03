import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class DeleteProjectDto {
  @ApiProperty({ example: 1, description: 'Project id' })
  readonly id: string;
}
