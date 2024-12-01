import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
interface TaskCreation {
  name: string;
  description: string;
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
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Аутентификация', description: 'Название задачи' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Реализовать аутентификацию', description: 'Описание задачи' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 14, description: 'Id ответсвенного пользователя' })
  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: null })
  responsible_id: number;

  @ApiProperty({ example: '2024-01-12', description: 'Крайняя дата выполнения' })
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deadline: Date;

  @ApiProperty({ example: 'Completed', description: 'Статус выполнения задачи' })
  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: null })
  status: boolean;

  @ApiProperty({ example: null, description: 'Архивирована задача или нет' })
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deleted_at: Date | null;
}
