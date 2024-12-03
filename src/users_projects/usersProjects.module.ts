import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { UsersProjectsController } from './usersProjects.controller';
import { UsersProjects } from './usersProjects.modules';
import { UsersProjectsService } from './usersProjects.service';

@Module({
  controllers: [UsersProjectsController],
  providers: [UsersProjectsService],
  imports: [SequelizeModule.forFeature([UsersProjects]), forwardRef(() => AuthModule)],
  exports: [UsersProjectsService],
})
export class UsersProjectsModule {}
