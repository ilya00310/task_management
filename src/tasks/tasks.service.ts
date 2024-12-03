import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.modules';
import { CreateTaskDto } from './dto/createTask';
import { DeleteTaskDto } from './dto/deleteTask';
import { setStatusDto } from './dto/setStatusDto';
import { setDeadlineDto } from './dto/setDeadline';
import { setResponsibleDto } from './dto/setResponsibleDto';
import { CurrentUserDto } from '../auth/dto/currentUserDto';
import { updateTaskDto } from './dto/updateTaskDto';
import { UsersProjectsService } from '../users_projects/usersProjects.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private usersProjectsRepository: UsersProjectsService,
  ) {}

  async createTask(dto: CreateTaskDto, currentUser: CurrentUserDto): Promise<Task> {
    const { id, role } = currentUser;
    const { project_id } = dto;
    const currentUsersProjects = await this.usersProjectsRepository.getUsersProjectsCompliance(id, project_id);
    if (!currentUsersProjects && role === 'employee') {
      throw new NotFoundException('Пользователь не прикреплен к проекту ');
    }

    if (!dto.responsible_id) {
      dto.responsible_id = id;
    }
    const task = await this.taskRepository.create(dto);
    return task;
  }

  async deleteTasks(dto: DeleteTaskDto, currentUser: CurrentUserDto): Promise<Task> {
    const { id } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    const taskCurrentUser = await this.taskRepository.findOne({ where: { responsible_id: currentUser.id, name: task.name } });
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    if (task.deleted_at !== null) {
      throw new BadRequestException('Задача уже архивирована');
    }

    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException('Задача не относится к этому сотруднику');
    }

    task.deleted_at = new Date();
    await task.save();
    return task;
  }

  async setStatus(dto: setStatusDto, currentUser: CurrentUserDto): Promise<Task> {
    const { id, status } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    const taskCurrentUser = await this.taskRepository.findOne({ where: { responsible_id: currentUser.id, name: task.name } });
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    if (task.status === status) {
      throw new BadRequestException('Текущий статус уже установлен');
    }
    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException('Задача не относится к этому сотруднику');
    }
    task.status = status;
    await task.save();
    return task;
  }

  async setDeadline(dto: setDeadlineDto, currentUser: CurrentUserDto): Promise<Task> {
    const { id, deadline } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    const taskCurrentUser = await this.taskRepository.findOne({ where: { responsible_id: currentUser.id, name: task.name } });
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }
    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException('Задача не относится к этому сотруднику');
    }
    task.deadline = deadline;
    await task.save();
    return task;
  }

  async setResponsible(dto: setResponsibleDto, currentUser: CurrentUserDto): Promise<Task> {
    const { id, responsible_id } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    const taskCurrentUser = await this.taskRepository.findOne({ where: { responsible_id: currentUser.id, name: task.name } });
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }
    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException('Задача не относится к этому сотруднику');
    }

    task.responsible_id = responsible_id;
    await task.save();
    return task;
  }

  async updateTask(dto: updateTaskDto, currentUser: CurrentUserDto): Promise<string> {
    const { id, name, description } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    const taskCurrentUser = await this.taskRepository.findOne({ where: { responsible_id: currentUser.id, name: task.name } });
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }
    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException('Задача не относится к этому сотруднику');
    }
    await this.taskRepository.update({ name, description }, { where: { id } });
    return 'Задача обновлена';
  }
}
