import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.modules';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersProjectsModule } from './users_projects/usersProjects.module';
import { Project } from './projects/projects.modules';
import { Task } from './tasks/tasks.modules';
import { Tasks_users } from './tasks_users/tasksUsers.modules';
import { Users_projects } from './users_projects/usersProjects.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: +process.env.DB_PORT,
      models: [User, Project, Task, Tasks_users, Users_projects],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    ProjectsModule,
    UsersProjectsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AppModule {}
