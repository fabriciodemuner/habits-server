import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiLoginRequest, Permissions } from '../auth/app.guard';
import { CreateHabitRequestDto } from './dto/create-habit-request.dto';
import { HabitResponseDto } from './dto/habit-response.dto';
import { UpdateDaysRequestDto } from './dto/update-days-request.dto';
import { UpdateHabitRequestDto } from './dto/update-habit-request.dto';
import { HabitService } from './habit.service';

@Controller('habit')
export class HabitController {
    constructor(private habitService: HabitService) {}

    @Post()
    async createHabit(@Body() dto: CreateHabitRequestDto, @Req() req: ApiLoginRequest): Promise<HabitResponseDto> {
        return await this.habitService.createHabit(dto, req);
    }

    @Get()
    async listHabits(@Req() req: ApiLoginRequest): Promise<HabitResponseDto[]> {
        return await this.habitService.listHabits(req.user);
    }

    @Put(':habitId')
    @Permissions({
        resource: 'Habit',
    })
    async updateHabit(@Param('habitId') habitId: number, @Body() dto: UpdateHabitRequestDto): Promise<HabitResponseDto> {
        return await this.habitService.updateHabit({ id: habitId, ...dto });
    }

    @Put(':habitId/days')
    @Permissions({
        resource: 'Habit',
    })
    async updateDays(@Param('habitId') habitId: number, @Body() dto: UpdateDaysRequestDto): Promise<HabitResponseDto> {
        return await this.habitService.updateDays({ id: habitId, ...dto });
    }

    @Delete(':habitId')
    @Permissions({
        resource: 'Habit',
    })
    async deleteHabit(@Param('habitId') habitId: number): Promise<boolean> {
        return await this.habitService.deleteHabit(habitId);
    }
}
