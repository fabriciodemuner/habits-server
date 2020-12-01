import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppRepo, repoProviders } from './common/app.repo';
import { HabitController } from './habit/habit.controller';
import { Habit } from './habit/habit.entity';
import { HabitService } from './habit/habit.service';
import * as ormconfig from './db/ormconfig';

@Module({
    imports: [TypeOrmModule.forRoot(ormconfig as any)],
    controllers: [HabitController],
    providers: [...repoProviders([Habit]), AppRepo, HabitService],
})
export class AppModule {}
