import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { TasksProjectsController } from './tasksProjects.controller';
import { TasksProjects } from './tasksProjects.modules';
import { TasksProjectsService } from './tasksProjects.service';
@Module({
  controllers: [TasksProjectsController],
  providers: [TasksProjectsService],
  imports: [SequelizeModule.forFeature([TasksProjects]), forwardRef(() => AuthModule)],
  exports: [TasksProjectsService],
})
export class TasksProjectsModule {}
