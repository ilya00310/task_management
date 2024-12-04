import { Body, Controller, Delete, Post, UseGuards, Patch, Request, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './tasks.modules';
import { CreateTaskDto } from './dto/createTask';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { setStatusDto } from './dto/setStatusDto';
import { setDeadlineDto } from './dto/setDeadline';
import { setResponsibleDto } from './dto/setResponsibleDto';
import { updateTaskDto } from './dto/updateTaskDto';
import { Roles } from '../auth/roles_auth.decorator';
import { RolesGuard } from '../auth/roles-guard';
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
  @Delete()
  delete(@Query('id') id: string, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.deleteTask(Number(id), currentUser);
  }

  @ApiOperation({ summary: 'Set task status' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Patch('/status')
  setStatus(@Body() taskDto: setStatusDto, @Query('id') id: string, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.setStatus(taskDto, Number(id), currentUser);
  }

  @ApiOperation({ summary: 'Set task deadline' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Patch('/deadline')
  setDeadline(@Body() taskDto: setDeadlineDto, @Query('id') id: string, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.setDeadline(taskDto, Number(id), currentUser);
  }

  @ApiOperation({ summary: 'Set responsible' })
  @ApiResponse({ status: 200, type: Task })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Patch('/responsible')
  setResponsible(@Body() taskDto: setResponsibleDto, @Query('id') id: string) {
    return this.TasksService.setResponsible(taskDto, Number(id));
  }

  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateTask(@Body() taskDto: updateTaskDto, @Query('id') id: string, @Request() req) {
    const currentUser = req.user;
    return this.TasksService.updateTask(taskDto, Number(id), currentUser);
  }
}
