import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { IsStrongPassword } from '../isStrongPassword';

@Exclude()
export class RegisterRequestDto {
    @IsEmail()
    @Expose()
    email: string;

    @IsStrongPassword()
    @Expose()
    password: string;

    @IsString()
    @Expose()
    name: string;
}
