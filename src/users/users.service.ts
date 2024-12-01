import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.modules';
import { CreateUserDto } from './dto/createUser';
import { DeleteUserDto } from './dto/deleteUser';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async delete_employee(userDto: DeleteUserDto): Promise<User> {
    const { id } = userDto;
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (user.deleted_at !== null) {
      throw new BadRequestException('Пользователь уже архивирован');
    }

    user.deleted_at = new Date();
    await user.save();
    return user;
  }
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user;
  }
}
