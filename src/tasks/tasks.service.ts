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
  // сделать проверку на существование проекта
  async createTask(dto: CreateTaskDto, currentUser: CurrentUserDto): Promise<Task> {
    const { id, role } = currentUser;
    const { project_id } = dto;
    const currentUsersProjects = await this.usersProjectsRepository.getUsersProjectsCompliance(id, project_id);
    if (!currentUsersProjects && role === 'employee') {
      throw new NotFoundException("User don't assigned to the project");
    }

    if (!dto.responsible_id) {
      dto.responsible_id = id;
    }
    const task = await this.taskRepository.create(dto);
    return task;
  }
  // добавить проверку на то, что пользователь является создателем проекта таски
  async deleteTasks(dto: DeleteTaskDto, currentUser: CurrentUserDto): Promise<Task> {
    const { id } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task don\t found');
    }
    const taskCurrentUser = await this.taskRepository.findOne({ where: { responsible_id: currentUser.id, name: task.name } });
    if (task.deleted_at !== null) {
      throw new BadRequestException('task has already been archived');
    }

    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException("Task dose'nt apply to this employee");
    }

    task.deleted_at = new Date();
    await task.save();
    return task;
  }

  async setStatus(dto: setStatusDto, currentUser: CurrentUserDto): Promise<Task> {
    const { id, status } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task don\t found');
    }
    const taskCurrentUser = await this.taskRepository.findOne({ where: { responsible_id: currentUser.id, name: task.name } });
    if (task.status === status) {
      throw new BadRequestException("Current status don't set");
    }
    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException("Task dose'nt apply to this employee");
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
      throw new NotFoundException('Task don\t found');
    }
    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException("Task dose'nt apply to this employee");
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
      throw new NotFoundException('Task don\t found');
    }
    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException("Task dose'nt apply to this employee");
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
      throw new NotFoundException('Task don\t found');
    }
    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException("Task dose'nt apply to this employee");
    }
    await this.taskRepository.update({ name, description }, { where: { id } });
    return 'Task update';
  }
}
