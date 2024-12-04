import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { TasksUsersController } from './tasksUsers.controller';
import { Tasks_users } from './tasksUsers.modules';
import { TasksUsersService } from './tasksUsers.service';
@Module({
  controllers: [TasksUsersController],
  providers: [TasksUsersService],
  imports: [SequelizeModule.forFeature([Tasks_users]), forwardRef(() => AuthModule)],
  exports: [TasksUsersService],
})
export class TasksUsersModule {}
