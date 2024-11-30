import { Body, Controller, Get, Post, UseGuards, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.modules';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles_auth.decorator';
import { RolesGuard } from '../auth/roles-guard';
// Документирую тег набора контроллеров
@ApiTags('Пользователи')
@Controller('/users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  // для документации в swagger добавляем новый декоратор, указывая название, возвращаемый статут и тип
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  // чтобы использовать guard, и предотвротить работу с эндпоинтом не авторизованному пользователю
  // прописываем контроллер useGuards
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.UsersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  // чтобы допустить работу только для определенных ролей, пишем roles
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Delete()
  delete_employee() {
    return this.UsersService.delete_empoyee();
  }
}
