import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './projects.modules';
import { CreateProjectDto } from './dto/createProject';
@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project) private projectRepository: typeof Project) {}
  async createProject(dto: CreateProjectDto): Promise<Project> {
    const project = await this.projectRepository.create(dto);
    return project;
  }
}
