import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// Документирую тег набора контроллеров
@ApiTags('Пользователи проектов')
@Controller('/users')
export class UsersProjectsController {
  constructor(private UsersProjectsService: UsersProjectsController) {}
}
