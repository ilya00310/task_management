import { ApiProperty } from '@nestjs/swagger';
export class updateTaskDto {
  @ApiProperty({ example: 'Roles', description: 'New task name' })
  readonly name: string;

  @ApiProperty({ example: 'Realize new roles', description: 'New task description' })
  readonly description: string;
}
