import { ApiProperty } from '@nestjs/swagger';
export class CreateProjectDto {
  @ApiProperty({ example: 'online_shop', description: 'Project name' })
  readonly name: string;

  @ApiProperty({ example: 'Create online shop', description: 'Project description' })
  readonly description: string;

  @ApiProperty({ example: 1, description: 'Project creator' })
  creator_id: number;
}
