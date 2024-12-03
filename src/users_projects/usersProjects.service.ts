import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersProjects } from './usersProjects.modules';
import { CreateUsersProjectsDto } from './dto/createUsersProject';
@Injectable()
export class UsersProjectsService {
  constructor(@InjectModel(UsersProjects) private usersProductsRepository: typeof UsersProjects) {}

  async createUsersProjects(dto: CreateUsersProjectsDto): Promise<UsersProjects> {
    const project = await this.usersProductsRepository.create(dto);
    return project;
  }

  async getUsersProjectsByUserId(user_id: number): Promise<UsersProjects> {
    const project = await this.usersProductsRepository.findOne({ where: { user_id } });
    return project;
  }
  async getUsersProjectsCompliance(user_id: number, project_id: number): Promise<UsersProjects> {
    const project = await this.usersProductsRepository.findOne({ where: { user_id, project_id } });
    return project;
  }
}
