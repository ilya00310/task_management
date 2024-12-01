import { Body, Controller, Delete, Post, UseGuards, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/createProject';
import { ProjectsService } from './projects.service';
import { Project } from './projects.modules';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// Документирую тег набора контроллеров
@ApiTags('Проекты')
@Controller('/projects')
export class ProjectsController {
  constructor(private ProjectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 200, type: Project })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() taskDto: CreateProjectDto) {
    return this.ProjectsService.createProject(taskDto);
  }
}
