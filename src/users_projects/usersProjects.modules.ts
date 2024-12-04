import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
interface UserProjectsCreation {
  user_id: number;
  project_id: number;
}

@Table({
  tableName: 'Users_projects',
  timestamps: false,
})
export class Users_projects extends Model<Users_projects, UserProjectsCreation> {
  @ApiProperty({ example: 1, description: 'Unique id' })
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
  project_id: number;
}
