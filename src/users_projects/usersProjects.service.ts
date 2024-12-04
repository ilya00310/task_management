import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Users_projects } from './usersProjects.modules';
import { CreateUsersProjectsDto } from './dto/createUsersProject';
@Injectable()
export class UsersProjectsService {
  constructor(@InjectModel(Users_projects) private usersProductsRepository: typeof Users_projects) {}

  async createUsersProjects(dto: CreateUsersProjectsDto): Promise<Users_projects> {
    const project = await this.usersProductsRepository.create(dto);
    return project;
  }

  async getUsersProjectsByUserId(user_id: number): Promise<Users_projects> {
    const project = await this.usersProductsRepository.findOne({ where: { user_id } });
    return project;
  }
  async getUsersProjectsCompliance(user_id: number, project_id: number): Promise<Users_projects> {
    const project = await this.usersProductsRepository.findOne({ where: { user_id, project_id } });
    return project;
  }
}
