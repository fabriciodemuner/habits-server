import { Exclude, Expose } from 'class-transformer';
import { IsISO8601, IsNotEmpty } from 'class-validator';

@Exclude()
export class UpdateDaysRequestDto {
    @Expose()
    id: number;

    @Expose()
    @IsNotEmpty()
    @IsISO8601({ strict: true })
    date: Date;
}
