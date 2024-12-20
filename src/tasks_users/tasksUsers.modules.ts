import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
interface TaskUsersCreation {
  user_id: number;
  task_id: number;
}

@Table({
  tableName: 'Tasks_users',
  timestamps: false,
})
export class Tasks_users extends Model<Tasks_users, TaskUsersCreation> {
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
