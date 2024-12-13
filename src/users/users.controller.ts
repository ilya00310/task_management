import { Body, Controller, Get, Post, UseGuards, Delete, Patch, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.modules';
import { Roles } from '../auth/roles_auth.decorator';
import { RolesGuard } from '../auth/roles-guard';
@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.UsersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Delete()
  archive_employee(@Query('id') id: string) {
    return this.UsersService.delete_employee(Number(id));
  }
}
