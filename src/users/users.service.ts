import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { User } from './users.modules';
import { CreateUserDto } from './dto/createUser';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }
  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user;
  }
}