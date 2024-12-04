import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersProjectsService } from './usersProjects.service';
@ApiTags('Project_users')
@Controller()
export class UsersProjectsController {
  constructor(private UsersProjectsService: UsersProjectsService) {}
}
