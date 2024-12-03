import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
interface UserProjectsCreation {
  user_id: number;
  project_id: number;
}

@Table({
  tableName: 'UsersProjects',
  timestamps: false,
})
// здесь документируем класс user,чтобы указывало его структуру, которая ожидается на возврат
export class UsersProjects extends Model<UsersProjects, UserProjectsCreation> {
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
