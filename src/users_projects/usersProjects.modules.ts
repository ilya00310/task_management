import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
interface UserProjectsCreation {
  password: string;
  email: string;
  username: string;
}

@Table({
  tableName: 'UsersProjects',
  timestamps: true,
})
// здесь документируем класс user,чтобы указывало его структуру, которая ожидается на возврат
export class UserProjects extends Model<UserProjects, UserProjectsCreation> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 4, description: 'Id пользователя' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ApiProperty({ example: 6, description: 'Id проекта' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  project_id: number;
}
