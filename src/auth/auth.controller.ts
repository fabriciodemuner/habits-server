import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Permissions } from './app.guard';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change.password.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { RegisterRequestDto } from './dto/register.request.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    @Permissions({ public: true })
    @HttpCode(HttpStatus.OK)
    public async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
        return await this.authService.login(dto);
    }

    @Post('/register')
    @Permissions({ public: true })
    @HttpCode(HttpStatus.OK)
    public async register(@Body() dto: RegisterRequestDto): Promise<LoginResponseDto> {
        return await this.authService.register(dto);
    }

    @Post('/change-password')
    @HttpCode(HttpStatus.OK)
    public async changePassword(@Req() req, @Body() dto: ChangePasswordDto): Promise<boolean> {
        return await this.authService.changePassword(req.user.id, dto);
    }

    @Get('/profile')
    getProfile(@Req() req) {
        return req.user;
    }
}
