import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class HabitResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    streak: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
