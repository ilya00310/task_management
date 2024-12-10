import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.modules';
import { CreateTaskDto } from './dto/createTask';
import { setStatusDto } from './dto/setStatusDto';
import { setDeadlineDto } from './dto/setDeadline';
import { setResponsibleDto } from './dto/setResponsibleDto';
import { CurrentUserDto } from '../auth/dto/currentUserDto';
import { updateTaskDto } from './dto/updateTaskDto';
import { UsersProjectsService } from '../users_projects/usersProjects.service';
import { TasksUsersService } from '../tasks_users/tasksUsers.service';
import { UsersService } from '../users/users.service';
import { Tasks_users } from '../tasks_users/tasksUsers.modules';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private usersProjectsRepository: UsersProjectsService,
    private tasksUsersRepository: TasksUsersService,
    private usersRepository: UsersService,
  ) {}
  async createTask(dto: CreateTaskDto, currentUser: CurrentUserDto): Promise<Task> {
    const { id, role } = currentUser;
    const { project_id } = dto;
    const currentUsersProjects = await this.usersProjectsRepository.getUsersProjectsCompliance(id, project_id);
    if (!currentUsersProjects && role === 'employee') {
      throw new NotFoundException("User don't assigned to the project");
    }
    const task = await this.taskRepository.create(dto);
    await this.tasksUsersRepository.createTasksUsers({ user_id: id, task_id: task.id });
    return task;
  }
  async deleteTask(id: number, currentUser: CurrentUserDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException("Task don't found");
    }
    if (task.deleted_at !== null) {
      throw new BadRequestException('task has already been archived');
    }
    const taskCurrentUser = await this.tasksUsersRepository.getTasksUsersCompliance(currentUser.id, id);
    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException("User don't tied to current task");
    }
    task.deleted_at = new Date();
    await task.save();
    return task;
  }

  async setStatus(dto: setStatusDto, id: number, currentUser: CurrentUserDto): Promise<Task> {
    const { status } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException("Task don't found");
    }
    const taskCurrentUser = await this.tasksUsersRepository.getTasksUsersCompliance(currentUser.id, id);
    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException("User don't tied to current task ");
    }
    if (task.status === status) {
      throw new BadRequestException('Current status set');
    }

    task.status = status;
    await task.save();
    return task;
  }

  async setDeadline(dto: setDeadlineDto, id: number, currentUser: CurrentUserDto): Promise<Task> {
    const { deadline } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    const taskCurrentUser = await this.tasksUsersRepository.getTasksUsersCompliance(currentUser.id, id);
    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException("User don't tied to current task ");
    }
    if (!task) {
      throw new NotFoundException('Task don\t found');
    }

    task.deadline = deadline;
    await task.save();
    return task;
  }

  async setResponsible(dto: setResponsibleDto, id: number): Promise<Tasks_users> {
    const { user_id } = dto;
    const task = await this.taskRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException('Task don\t found');
    }
    const user = await this.usersRepository.getUserById(user_id);
    if (!user) {
      throw new NotFoundException("User don't found");
    }
    const tasksUsers = await this.tasksUsersRepository.createTasksUsers({ user_id, task_id: id });
    return tasksUsers;
  }

  async updateTask(dto: updateTaskDto, id: number, currentUser: CurrentUserDto): Promise<Task> {
    const { name, description } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    const taskCurrentUser = await this.tasksUsersRepository.getTasksUsersCompliance(currentUser.id, id);
    if (!taskCurrentUser && currentUser.role === 'employee') {
      throw new BadRequestException("User don't tied to current task ");
    }
    if (!task) {
      throw new NotFoundException('Task don\t found');
    }
    task.name = name;
    task.description = description;
    await task.save();
    return task;
  }
}
