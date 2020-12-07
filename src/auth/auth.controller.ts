import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { RegisterRequestDto } from './dto/register.request.dto';
import { AuthService } from './auth.service';
import { Permissions } from './app.guard';

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

    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
