import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './projects.modules';
import { UsersModule } from '../users/users.module';
import { UsersProjectsModule } from '../users_projects/usersProjects.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [SequelizeModule.forFeature([Project]), forwardRef(() => AuthModule), forwardRef(() => UsersModule), UsersProjectsModule],
  exports: [ProjectsService],
})
export class ProjectsModule {}
