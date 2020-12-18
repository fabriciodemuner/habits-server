import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RefreshTokenResponseDto {
    @Expose()
    accessToken: string;
}
