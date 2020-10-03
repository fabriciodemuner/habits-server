import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

@Exclude()
export class UpdateHabitRequestDto {
    @Expose()
    id: number;

    @Expose()
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @Expose()
    @IsOptional()
    @IsNotEmpty()
    description?: string;
}
