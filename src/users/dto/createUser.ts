import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class CreateUserDto {
  @ApiProperty({ example: '13123123', description: 'User password' })
  readonly password: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: 'Ilya00310', description: 'User name' })
  readonly username: string;
}
