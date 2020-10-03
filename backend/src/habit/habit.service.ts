import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
// import { AppRepo, InjectRepo } from '../common/app.repo';
import { CreateHabitRequestDto } from './dto/create-habit-request.dto';
import { HabitResponseDto } from './dto/habit-response.dto';
import { UpdateHabitRequestDto } from './dto/update-habit-request.dto';
import { Habit } from './habit.entity';

@Injectable()
export class HabitService {
    // constructor(@InjectRepo(Habit) private habitRepo: AppRepo<Habit>) {}

    async createHabit(dto: CreateHabitRequestDto): Promise<HabitResponseDto> {
        const habit = new Habit();
        habit.name = dto.name;
        habit.description = dto.description;

        // await this.habitRepo.save(habit);
        return plainToClass(HabitResponseDto, habit);
    }

    async listHabits(): Promise<HabitResponseDto[]> {
        // const habits = await this.habitRepo.find({ order: { id: 'ASC' } });
        // return plainToClass(HabitResponseDto, habits, { enableImplicitConversion: true });
        const date = new Date()
        return [{
            id: 1,
            name: 'test',
            streak: 3,
            createdAt: date,
            updatedAt: date
        }];
    }

    async updateHabit(dto: UpdateHabitRequestDto): Promise<HabitResponseDto> {
        // const habit = await this.habitRepo.findOne(dto.id);
        const date = new Date()
        const habits: {
            id: number;
            name: string;
            description: string;
            updatedAt: Date;
        }[] = [
            {
                id: 1,
                name: 'name',
                description: 'description',
                updatedAt: date
            },
            {
                id: 2,
                name: 'name',
                description: 'description',
                updatedAt: date
            },
            {
                id: 3,
                name: 'name',
                description: 'description',
                updatedAt: date
            }
        ]
        const index = Math.floor(Math.random() * 4)
        const habit = habits[index]
        if (!habit) {
            throw new NotFoundException();
        }
        habit.name = dto.name || habit.name;
        habit.description = dto.description || habit.description;
        habit.updatedAt = new Date();
        // await this.habitRepo.save(habit);

        return plainToClass(HabitResponseDto, habit);
    }

    async deleteHabit(habitId: number): Promise<boolean> {
        // const habit = await this.habitRepo.findOne(habitId);
        const date = new Date()
        const habits: {
            id: number;
            name: string;
            description: string;
            updatedAt: Date;
        }[] = [
            {
                id: 1,
                name: 'name',
                description: 'description',
                updatedAt: date
            },
            {
                id: 2,
                name: 'name',
                description: 'description',
                updatedAt: date
            },
            {
                id: 3,
                name: 'name',
                description: 'description',
                updatedAt: date
            }
        ]
        const index = Math.floor(Math.random() * 4)
        const habit = habits[index]
        if (!habit) {
            throw new NotFoundException();
        }
        // await this.habitRepo.delete(habitId);
        console.log(habitId)
        return true;
    }
}
