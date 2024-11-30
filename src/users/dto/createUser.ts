import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class CreateUserDto {
  @ApiProperty({ example: '13123123', description: 'Пароль пользователя' })
  readonly password: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почта пользователя' })
  readonly email: string;

  @ApiProperty({ example: 'Ilya00310', description: 'Имя пользователя' })
  readonly username: string;
}
