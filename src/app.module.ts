import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppRepo, repoProviders } from './common/app.repo';
import { HabitController } from './habit/habit.controller';
import { Habit } from './habit/habit.entity';
import { HabitService } from './habit/habit.service';
import * as ormconfig from './db/ormconfig';
import { User } from './user/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
    imports: [TypeOrmModule.forRoot(ormconfig as any)],
    controllers: [HabitController, UserController],
    providers: [...repoProviders([Habit, User]), AppRepo, HabitService, UserService],
})
export class AppModule {}
