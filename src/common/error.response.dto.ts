import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ErrorResponseDto {
    @Expose()
    code?: string;

    @Expose()
    message: string;
}
