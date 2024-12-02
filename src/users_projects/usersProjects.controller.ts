import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersProjectsService } from './usersProjects.service';
// Документирую тег набора контроллеров
@ApiTags('Project users')
@Controller('/users')
export class UsersProjectsController {
  constructor(private UsersProjectsService: UsersProjectsService) {}
}
