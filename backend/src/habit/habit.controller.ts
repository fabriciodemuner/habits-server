import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateHabitRequestDto } from './dto/create-habit-request.dto';
import { HabitResponseDto } from './dto/habit-response.dto';
import { UpdateDaysRequestDto } from './dto/update-days-request.dto';
import { UpdateHabitRequestDto } from './dto/update-habit-request.dto';
import { HabitService } from './habit.service';

@Controller('habit')
export class HabitController {
    constructor(private habitService: HabitService) {}

    @Post()
    async createHabit(@Body() dto: CreateHabitRequestDto): Promise<HabitResponseDto> {
        return await this.habitService.createHabit(dto);
    }

    @Get()
    async listHabits(): Promise<HabitResponseDto[]> {
        return await this.habitService.listHabits();
    }

    @Put(':id')
    async updateHabit(@Param('id') id: number, @Body() dto: UpdateHabitRequestDto): Promise<HabitResponseDto> {
        return await this.habitService.updateHabit({ id, ...dto });
    }

    @Put(':id/days')
    async updateDays(@Param('id') id: number, @Body() dto: UpdateDaysRequestDto): Promise<HabitResponseDto> {
        return await this.habitService.updateDays({ id, ...dto });
    }

    @Delete(':id')
    async deleteHabit(@Param('id') id: number): Promise<boolean> {
        return await this.habitService.deleteHabit(id);
    }
}
