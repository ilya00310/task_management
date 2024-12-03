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
@ApiTags('Projects')
@Controller('/projects')
export class ProjectsController {
  constructor(private ProjectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Creating a project' })
  @ApiResponse({ status: 200, type: Project })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() taskDto: CreateProjectDto) {
    return this.ProjectsService.createProject(taskDto);
  }

  @ApiOperation({ summary: 'Deleting a project' })
  @ApiResponse({ status: 200, type: Project })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Delete()
  delete(@Body() taskDto: DeleteProjectDto) {
    return this.ProjectsService.deleteProject(taskDto);
  }

  @ApiOperation({ summary: 'Adding a user to a board' })
  @ApiResponse({ status: 200, type: UsersProjects })
  @Post('/users_projects')
  @Roles('Admin')
  @UseGuards(RolesGuard)
  setUserOnProject(@Body() taskDto: CreateUsersProjectsDto) {
    return this.ProjectsService.addUserOnProject(taskDto);
  }
  // передавать id через строку запроса
  @ApiOperation({ summary: 'Editing a project' })
  @ApiResponse({ status: 200, type: Project })
  @Patch()
  @Roles('Admin')
  @UseGuards(RolesGuard)
  post(@Body() taskDto: UpdateProjectDto) {
    return this.ProjectsService.updateProject(taskDto);
  }
}
