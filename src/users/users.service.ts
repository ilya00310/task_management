import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.modules';
import { CreateUserDto } from './dto/createUser';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async deleteEmployee(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("User don't found");
    }

    if (user.deleted_at !== null) {
      throw new BadRequestException('User is already archived');
    }

    user.deleted_at = new Date();
    await user.save();
    return user;
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, include: { all: true } });
    return user;
  }
}
