import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersProjectsService } from './usersProjects.service';
// Документирую тег набора контроллеров
@ApiTags('Пользователи проектов')
@Controller('/users')
export class UsersProjectsController {
  constructor(private UsersProjectsService: UsersProjectsService) {}
}
