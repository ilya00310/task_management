import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class updateTaskDto {
  @ApiProperty({ example: 10, description: 'Task id' })
  readonly id: string;

  @ApiProperty({ example: 'Roles', description: 'New task name' })
  readonly name: string;

  @ApiProperty({ example: 'Realize new roles', description: 'New task description' })
  readonly description: string;
}
