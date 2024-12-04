import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksUsersService } from './tasksUsers.service';
@ApiTags('Project users')
@Controller('/users')
export class TasksUsersController {
  constructor(private TasksUsersService: TasksUsersService) {}
}
