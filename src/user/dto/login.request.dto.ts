import { Exclude, Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

@Exclude()
export class LoginRequestDto {
    @IsEmail()
    @Expose()
    email: string;

    @Expose()
    password: string;
}
