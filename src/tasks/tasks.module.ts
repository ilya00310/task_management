import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Task } from './tasks.modules';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { UsersProjectsModule } from '../users_projects/usersProjects.module';
import { TasksUsersModule } from '../tasks_users/tasksUsers.module';
import { ProjectsModule } from '../projects/projects.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    SequelizeModule.forFeature([Task]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersProjectsModule),
    forwardRef(() => TasksUsersModule),
    forwardRef(() => ProjectsModule),
    forwardRef(() => UsersModule),
  ],
  exports: [TasksService],
})
export class TasksModule {}
