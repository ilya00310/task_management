import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.modules';
import { CreateTaskDto } from './dto/createTask';
import { DeleteTaskDto } from './dto/deleteTask';
import { setStatusDto } from './dto/setStatusDto';
import { setDeadlineDto } from './dto/setDeadline';
import { setResponsibleDto } from './dto/setResponsibleDto';
@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.create(dto);
    return task;
  }

  async deleteTasks(dto: DeleteTaskDto): Promise<Task> {
    const { id } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    if (task.deleted_at !== null) {
      throw new BadRequestException('Задача уже архивирована');
    }

    task.deleted_at = new Date();
    await task.save();
    return task;
  }

  async setStatus(dto: setStatusDto): Promise<Task> {
    const { id, status } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    if (task.status === status) {
      throw new BadRequestException('Текущий статус уже установлен');
    }

    task.status = status;
    await task.save();
    return task;
  }

  async setDeadline(dto: setDeadlineDto): Promise<Task> {
    const { id, deadline } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    task.deadline = deadline;
    await task.save();
    return task;
  }

  async setResponsible(dto: setResponsibleDto): Promise<Task> {
    const { id, responsible_id } = dto;
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    task.responsible_id = responsible_id;
    await task.save();
    return task;
  }
}
