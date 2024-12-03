import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './projects.modules';
import { CreateProjectDto } from './dto/createProjectDto';
import { DeleteProjectDto } from './dto/deleteProjectsDto';
import { UsersService } from '../users/users.service';
import { UsersProjectsService } from '../users_projects/usersProjects.service';
import { CreateUsersProjectsDto } from '../users_projects/dto/createUsersProject';
import { UpdateProjectDto } from './dto/updateProjectDto';
import { UsersProjects } from '../users_projects/usersProjects.modules';
@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    private userRepository: UsersService,
    private userProjectRepository: UsersProjectsService,
  ) {}
  async createProject(dto: CreateProjectDto): Promise<Project> {
    const project = await this.projectRepository.create(dto);
    return project;
  }

  async deleteProject(dto: DeleteProjectDto): Promise<string> {
    const { id } = dto;
    const project = await this.projectRepository.findOne({ where: { id } });
    // найти способ автоматизировать проверку на null
    if (!project || project.deleted_at !== null) {
      throw new NotFoundException("Project don't found");
    }
    await this.projectRepository.update({ deleted_at: new Date(Date.now()) }, { where: { name: project.name } });
    return 'Project delete';
  }

  async addUserOnProject(dto: CreateUsersProjectsDto): Promise<UsersProjects> {
    const { user_id, project_id } = dto;
    const project = await this.projectRepository.findOne({ where: { id: project_id } });
    if (!project) {
      throw new NotFoundException("Project don't found");
    }
    const user = await this.userRepository.getUserById(user_id);
    if (!user) {
      throw new NotFoundException("User don't found");
    }
    const usersProject = await this.userProjectRepository.createUsersProjects(dto);
    return usersProject;
  }
  //
  async updateProject(dto: UpdateProjectDto): Promise<Project> {
    const { project_id, name, description } = dto;
    const project = await this.projectRepository.findOne({ where: { id: project_id, deleted_at: null } });
    if (!project) {
      throw new NotFoundException("Project don't found");
    }
    await this.projectRepository.update({ name, description }, { where: { id: project_id } });
    const newProject = await this.projectRepository.findOne({ where: { id: project_id } });
    return newProject;
  }
}
