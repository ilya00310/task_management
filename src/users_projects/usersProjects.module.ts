import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { UsersProjectsController } from './usersProjects.controller';
import { UsersService } from 'src/users/users.service';
import { UserProjects } from './usersProjects.modules';

@Module({
  controllers: [UsersProjectsController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([UserProjects]), forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
