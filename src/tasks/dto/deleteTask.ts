import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class DeleteTaskDto {
  @ApiProperty({ example: 10, description: 'Id удаляемого элемента' })
  readonly id: number;
}
