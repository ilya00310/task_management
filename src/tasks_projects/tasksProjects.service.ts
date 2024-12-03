import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TasksProjects } from './tasksProjects.modules';
import { CreateTasksProjectsDto } from './dto/createTasksProject';
@Injectable()
export class TasksProjectsService {
  constructor(@InjectModel(TasksProjects) private tasksProductsRepository: typeof TasksProjects) {}

  async createTasksProjects(dto: CreateTasksProjectsDto): Promise<TasksProjects> {
    const project = await this.tasksProductsRepository.create(dto);
    return project;
  }

  async getTasksProjectsByUserId(user_id: number): Promise<TasksProjects> {
    const project = await this.tasksProductsRepository.findOne({ where: { user_id } });
    return project;
  }
  async getTasksProjectsCompliance(user_id: number, task_id: number): Promise<TasksProjects> {
    const project = await this.tasksProductsRepository.findOne({ where: { user_id, task_id } });
    return project;
  }
}
