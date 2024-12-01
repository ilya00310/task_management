import { Body, Controller, Delete, Post, UseGuards, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './tasks.modules';
import { CreateTaskDto } from './dto/createTask';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeleteTaskDto } from './dto/deleteTask';
import { setStatusDto } from './dto/setStatusDto';
import { setDeadlineDto } from './dto/setDeadline';
import { setResponsibleDto } from './dto/setResponsibleDto';

// Документирую тег набора контроллеров
@ApiTags('Задачи')
@Controller('/tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() taskDto: CreateTaskDto) {
    return this.TasksService.createTask(taskDto);
  }

  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Delete('/id')
  delete(@Body() taskDto: DeleteTaskDto) {
    return this.TasksService.deleteTasks(taskDto);
  }

  @ApiOperation({ summary: 'Установка статуса задачи' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Patch('/status')
  setStatus(@Body() taskDto: setStatusDto) {
    return this.TasksService.setStatus(taskDto);
  }

  @ApiOperation({ summary: 'Установка дедлайна' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Patch('/deadline')
  setDeadline(@Body() taskDto: setDeadlineDto) {
    return this.TasksService.setDeadline(taskDto);
  }

  @ApiOperation({ summary: 'Назначение ответсвенного' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Patch('/responsible')
  setResponsible(@Body() taskDto: setResponsibleDto) {
    return this.TasksService.setResponsible(taskDto);
  }
}
