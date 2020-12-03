import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { RegisterRequestDto } from './dto/register.request.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async users(): Promise<User[]> {
        return await this.userService.users();
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    public async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
        return await this.userService.login(dto);
    }

    @Post('/register')
    @HttpCode(HttpStatus.OK)
    public async register(@Body() dto: RegisterRequestDto): Promise<LoginResponseDto> {
        return await this.userService.register(dto);
    }
}
