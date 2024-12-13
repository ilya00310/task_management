import { ApiProperty } from '@nestjs/swagger';
export class UpdateProjectDto {
  @ApiProperty({ example: 'website', description: 'New project name' })
  readonly name: string;

  @ApiProperty({ example: 'Create website', description: 'New project description' })
  readonly description: string;
}
