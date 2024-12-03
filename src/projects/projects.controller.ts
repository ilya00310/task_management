import { Body, Controller, Delete, Post, UseGuards, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/createProjectDto';
import { ProjectsService } from './projects.service';
import { Project } from './projects.modules';
import { RolesGuard } from '../auth/roles-guard';
import { Roles } from '../auth/roles_auth.decorator';
import { DeleteProjectDto } from './dto/deleteProjectsDto';
import { CreateUsersProjectsDto } from '../users_projects/dto/createUsersProject';
import { UsersProjects } from '../users_projects/usersProjects.modules';
import { UpdateProjectDto } from './dto/updateProjectDto';
// Документирую тег набора контроллеров
@ApiTags('Проекты')
@Controller('/projects')
export class ProjectsController {
  constructor(private ProjectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Создание проекта' })
  @ApiResponse({ status: 200, type: Project })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() taskDto: CreateProjectDto) {
    return this.ProjectsService.createProject(taskDto);
  }

  @ApiOperation({ summary: 'Удаление проекта' })
  @ApiResponse({ status: 200, type: Project })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Delete()
  delete(@Body() taskDto: DeleteProjectDto) {
    return this.ProjectsService.deleteProject(taskDto);
  }

  @ApiOperation({ summary: 'Добавление пользователя на доску' })
  @ApiResponse({ status: 200, type: UsersProjects })
  @Post('/usersProjects')
  @Roles('Admin')
  @UseGuards(RolesGuard)
  setUserOnProject(@Body() taskDto: CreateUsersProjectsDto) {
    return this.ProjectsService.addUserOnProject(taskDto);
  }

  @ApiOperation({ summary: 'Редактирование проекта' })
  @ApiResponse({ status: 200, type: Project })
  @Patch()
  @Roles('Admin')
  @UseGuards(RolesGuard)
  post(@Body() taskDto: UpdateProjectDto) {
    return this.ProjectsService.updateProject(taskDto);
  }
}
