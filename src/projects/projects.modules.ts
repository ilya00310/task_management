import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
interface ProjectCreation {
  name: string;
  description: string;
  creator_id: number;
}

@Table({
  tableName: 'Projects',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
// здесь документируем класс user,чтобы указывало его структуру, которая ожидается на возврат
export class Project extends Model<Project, ProjectCreation> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'online_shop', description: 'Project name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Realize online shop', description: 'Project description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 'Ilya', description: 'Responsible user' })
  @Column({ type: DataType.NUMBER, allowNull: false })
  creator_id: Number;

  @ApiProperty({ example: 'null', description: 'Project archived or not' })
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deleted_at?: Date | null;
}
