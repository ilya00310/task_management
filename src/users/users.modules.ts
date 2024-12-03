import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
interface UserCreation {
  password: string;
  email: string;
  username: string;
}

@Table({
  tableName: 'Users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
// здесь документируем класс user,чтобы указывало его структуру, которая ожидается на возврат
export class User extends Model<User, UserCreation> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '13123123', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({ example: 'Ilya00310', description: 'Username' })
  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @ApiProperty({ example: 'employee', description: 'User role' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'employee' })
  role: string;

  @ApiProperty({ example: 'null', description: 'User is archived or not' })
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deleted_at?: Date | null;
}
