import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class DeleteUserDto {
  @ApiProperty({ example: 10, description: 'User id' })
  readonly id: number;
}
