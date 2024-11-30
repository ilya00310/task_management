import { ApiProperty } from '@nestjs/swagger';
// документируем, указывая, какого формата данные ожидаются на вход
export class LoginUserDto {
  @ApiProperty({ example: '13123123', description: 'Пароль пользователя' })
  readonly password: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почта пользователя' })
  readonly email: string;
}