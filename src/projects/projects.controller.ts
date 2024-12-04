import { Body, Controller, Delete, Post, UseGuards, Patch, Request, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/createProjectDto';
import { ProjectsService } from './projects.service';
import { Project } from './projects.modules';
import { RolesGuard } from '../auth/roles-guard';
import { Roles } from '../auth/roles_auth.decorator';
import { CreateUsersProjectsDto } from '../users_projects/dto/createUsersProject';
import { Users_projects } from '../users_projects/usersProjects.modules';
import { UpdateProjectDto } from './dto/updateProjectDto';
@ApiTags('Projects')
@Controller('/projects')
export class ProjectsController {
  constructor(private ProjectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Creating a project' })
  @ApiResponse({ status: 200, type: Project })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() taskDto: CreateProjectDto, @Request() req) {
    const currentUser = req.user;
    return this.ProjectsService.createProject(taskDto, currentUser);
  }

  @ApiOperation({ summary: 'Deleting a project' })
  @ApiResponse({ status: 200, type: Project })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Delete()
  delete(@Query('id') id: string) {
    return this.ProjectsService.deleteProject(Number(id));
  }

  @ApiOperation({ summary: 'Adding a user to a board' })
  @ApiResponse({ status: 200, type: Users_projects })
  @Post('/users_projects')
  @Roles('Admin')
  @UseGuards(RolesGuard)
  setUserOnProject(@Body() taskDto: CreateUsersProjectsDto) {
    return this.ProjectsService.addUserOnProject(taskDto);
  }
  @ApiOperation({ summary: 'Editing a project' })
  @ApiResponse({ status: 200, type: Project })
  @Patch()
  @Roles('Admin')
  @UseGuards(RolesGuard)
  post(@Body() taskDto: UpdateProjectDto) {
    return this.ProjectsService.updateProject(taskDto);
  }
}
