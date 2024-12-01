import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Task } from './tasks.modules';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [SequelizeModule.forFeature([Task]), forwardRef(() => AuthModule)],
  exports: [TasksService],
})
export class TasksModule {}
