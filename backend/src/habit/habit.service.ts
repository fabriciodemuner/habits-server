import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AppRepo, InjectRepo } from '../common/app.repo';
import { CreateHabitRequestDto } from './dto/create-habit-request.dto';
import { HabitResponseDto } from './dto/habit-response.dto';
import { UpdateHabitRequestDto } from './dto/update-habit-request.dto';
import { Habit } from './habit.entity';

@Injectable()
export class HabitService {
    constructor(@InjectRepo(Habit) private habitRepo: AppRepo<Habit>) {}

    async createHabit(dto: CreateHabitRequestDto): Promise<HabitResponseDto> {
        const habit = new Habit();
        habit.name = dto.name;
        habit.description = dto.description;

        await this.habitRepo.save(habit);
        return plainToClass(HabitResponseDto, habit);
    }

    async listHabits(): Promise<HabitResponseDto[]> {
        const habits = await this.habitRepo.find({ order: { id: 'ASC' } });
        return plainToClass(HabitResponseDto, habits, { enableImplicitConversion: true });
    }

    async updateHabit(dto: UpdateHabitRequestDto): Promise<HabitResponseDto> {
        const habit = await this.habitRepo.findOne(dto.id);
        if (!habit) {
            throw new NotFoundException();
        }
        habit.name = dto.name || habit.name;
        habit.description = dto.description || habit.description;
        habit.updatedAt = new Date();
        await this.habitRepo.save(habit);
        return plainToClass(HabitResponseDto, habit);
    }

    async deleteHabit(habitId: number): Promise<boolean> {
        const habit = await this.habitRepo.findOne(habitId);
        if (!habit) {
            throw new NotFoundException();
        }
        await this.habitRepo.delete(habitId);
        return true;
    }
}
