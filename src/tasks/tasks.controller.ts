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
// везде передавать id через query string
// Документирую тег набора контроллеров
@ApiTags('Задачи')
@Controller('/tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() taskDto: CreateTaskDto, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.createTask(taskDto, currentUser);
  }

  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Delete('/id')
  delete(@Body() taskDto: DeleteTaskDto, @Request() req) {
    const currentUser = req.user;
    // переименовать в ед.ч
    return this.TasksService.deleteTasks(taskDto, currentUser);
  }

  @ApiOperation({ summary: 'Set task status' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Patch('/status')
  setStatus(@Body() taskDto: setStatusDto, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.setStatus(taskDto, currentUser);
  }

  @ApiOperation({ summary: 'Set deadline' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Patch('/deadline')
  setDeadline(@Body() taskDto: setDeadlineDto, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.setDeadline(taskDto, currentUser);
  }

  @ApiOperation({ summary: 'Set responsible' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Patch('/responsible')
  setResponsible(@Body() taskDto: setResponsibleDto, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.setResponsible(taskDto, currentUser);
  }

  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: 200, type: String })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateTask(@Body() taskDto: updateTaskDto, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.updateTask(taskDto, currentUser);
  }
}
