import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.modules';
import { AuthModule } from '../auth/auth.module';
import { Users_projects } from '../users_projects/usersProjects.modules';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule), forwardRef(() => Users_projects)],
  exports: [UsersService],
})
export class UsersModule {}
