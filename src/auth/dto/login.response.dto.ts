import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    accessToken: string;

    @Expose()
    refreshToken: string;
}
