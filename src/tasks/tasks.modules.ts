import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
interface TaskCreation {
  name: string;
  description: string;
  project_id: number;
  responsible_id: number;
  deadline: Date;
  status: boolean;
}

@Table({
  tableName: 'Tasks',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
// здесь документируем класс user,чтобы указывало его структуру, которая ожидается на возврат
export class Task extends Model<Task, TaskCreation> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Authentication', description: 'Task name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Realize Authentication', description: 'Description task' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 12, description: 'Project id' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  project_id: number;

  @ApiProperty({ example: 14, description: 'Responsible user id' })
  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: null })
  responsible_id: number;

  @ApiProperty({ example: '2024-01-12', description: 'deadline for completion' })
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deadline: Date;

  @ApiProperty({ example: 'Completed', description: 'task execution status' })
  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: null })
  status: boolean;

  @ApiProperty({ example: null, description: 'task archived or not' })
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deleted_at: Date | null;
}
