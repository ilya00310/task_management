import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserProjects } from './usersProjects.modules';
@Injectable()
export class UsersProjectsService {
  constructor(@InjectModel(UserProjects) private usersProductsRepository: typeof UserProjects) {}
}
