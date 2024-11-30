import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
interface User_creation {
  password: string;
  email: string;
  username: string;
  role: string;
}

@Table({
  tableName: 'Users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
// здесь документируем класс user,чтобы указывало его структуру, которая ожидается на возврат
export class User extends Model<User, User_creation> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '13123123', description: 'Пароль пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почта пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({ example: 'Ilya00310', description: 'Имя пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @ApiProperty({ example: 'employe', description: 'Роль пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'employee' })
  role: string;

  @ApiProperty({ example: 'null', description: 'Удален пользователь или нет' })
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deleted_at: Date | null;
}
