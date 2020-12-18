import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RefreshTokenRequestDto {
    @Expose()
    refreshToken: string;
}
