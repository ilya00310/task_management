import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksProjectsService } from './tasksProjects.service';
// Документирую тег набора контроллеров
@ApiTags('Project users')
@Controller('/users')
export class TasksProjectsController {
  constructor(private UsersProjectsService: TasksProjectsService) {}
}
