import { Exclude, Expose } from 'class-transformer';
import { IsStrongPassword } from './isStrongPassword';

@Exclude()
export class ChangePasswordDto {
    @Expose()
    currentPassword: string;

    @IsStrongPassword()
    @Expose()
    newPassword: string;
}
