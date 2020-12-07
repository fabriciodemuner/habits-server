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
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { AppGuard } from './auth/app.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [TypeOrmModule.forRoot(ormconfig as any)],
    controllers: [HabitController, UserController, AuthController],
    providers: [
        { provide: APP_GUARD, useClass: AppGuard },
        ...repoProviders([Habit, User]),
        AppRepo,
        HabitService,
        UserService,
        AuthService,
        JwtStrategy,
    ],
})
export class AppModule {}
