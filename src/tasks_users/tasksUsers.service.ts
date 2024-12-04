import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Tasks_users } from './tasksUsers.modules';
import { CreateTasksUsersDto } from './dto/createTasksUsers';
@Injectable()
export class TasksUsersService {
  constructor(@InjectModel(Tasks_users) private tasksProductsRepository: typeof Tasks_users) {}

  async createTasksUsers(dto: CreateTasksUsersDto): Promise<Tasks_users> {
    const project = await this.tasksProductsRepository.create(dto);
    return project;
  }

  async getTasksUsersByUserId(user_id: number): Promise<Tasks_users> {
    const project = await this.tasksProductsRepository.findOne({ where: { user_id } });
    return project;
  }
  async getTasksUsersCompliance(user_id: number, task_id: number): Promise<Tasks_users> {
    const project = await this.tasksProductsRepository.findOne({ where: { user_id, task_id } });
    return project;
  }
}
