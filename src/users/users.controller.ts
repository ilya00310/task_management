import { Body, Controller, Get, Post, UseGuards, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.modules';
import { Roles } from '../auth/roles_auth.decorator';
import { RolesGuard } from '../auth/roles-guard';
import { DeleteUserDto } from './dto/deleteUser';
// Документирую тег набора контроллеров
@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  // для документации в swagger добавляем новый декоратор, указывая название, возвращаемый статут и тип
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  // чтобы использовать guard, и предотвротить работу с эндпоинтом не авторизованному пользователю
  // прописываем контроллер useGuards
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.UsersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: [User] })
  // чтобы допустить работу только для определенных ролей, пишем roles
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Delete('/id')
  archive_employee(@Body() userDto: DeleteUserDto) {
    return this.UsersService.delete_employee(userDto);
  }
}
