import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
interface TaskProjectsCreation {
  user_id: number;
  task_id: number;
}

@Table({
  tableName: 'UsersProjects',
  timestamps: false,
})
// здесь документируем класс user,чтобы указывало его структуру, которая ожидается на возврат
export class TasksProjects extends Model<TasksProjects, TaskProjectsCreation> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 4, description: 'User id' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ApiProperty({ example: 6, description: 'Project id' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  task_id: number;
}
