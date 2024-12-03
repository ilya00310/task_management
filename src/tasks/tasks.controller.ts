import { Body, Controller, Delete, Post, UseGuards, Patch, Param, Request, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './tasks.modules';
import { CreateTaskDto } from './dto/createTask';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeleteTaskDto } from './dto/deleteTask';
import { setStatusDto } from './dto/setStatusDto';
import { setDeadlineDto } from './dto/setDeadline';
import { setResponsibleDto } from './dto/setResponsibleDto';
import { updateTaskDto } from './dto/updateTaskDto';

// Документирую тег набора контроллеров
@ApiTags('Задачи')
@Controller('/tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() taskDto: CreateTaskDto, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.createTask(taskDto, currentUser);
  }

  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Delete('/id')
  delete(@Body() taskDto: DeleteTaskDto, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.deleteTasks(taskDto, currentUser);
  }

  @ApiOperation({ summary: 'Установка статуса задачи' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Patch('/status')
  setStatus(@Body() taskDto: setStatusDto, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.setStatus(taskDto, currentUser);
  }

  @ApiOperation({ summary: 'Установка дедлайна' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Patch('/deadline')
  setDeadline(@Body() taskDto: setDeadlineDto, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.setDeadline(taskDto, currentUser);
  }

  @ApiOperation({ summary: 'Назначение ответсвенного' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Patch('/responsible')
  setResponsible(@Body() taskDto: setResponsibleDto, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.setResponsible(taskDto, currentUser);
  }

  @ApiOperation({ summary: 'Обновление задачи' })
  @ApiResponse({ status: 200, type: String })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateTask(@Body() taskDto: updateTaskDto, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.updateTask(taskDto, currentUser);
  }
}
