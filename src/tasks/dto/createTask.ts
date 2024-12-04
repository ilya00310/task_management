import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {
  @ApiProperty({ example: 'Authentication', description: 'Project name' })
  readonly name: string;

  @ApiProperty({ example: 'Realize authentication', description: 'Task description' })
  readonly description: string;

  @ApiProperty({ example: 4, description: 'Project id' })
  readonly project_id: number;

  @ApiProperty({ example: '2024-01-12', description: 'Task deadline' })
  readonly deadline: Date;

  @ApiProperty({ example: false, description: 'Task completion status' })
  readonly status: boolean;
}
