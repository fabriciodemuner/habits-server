import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepo, AppRepo } from '../common/app.repo';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { RegisterRequestDto } from './dto/register.request.dto';
import { User } from './user.entity';
import * as config from 'config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(@InjectRepo(User) private userRepo: AppRepo<User>) {}

    async register(dto: RegisterRequestDto): Promise<LoginResponseDto> {
        const existingUser = await this.userRepo.findOne({ email: dto.email });
        if (existingUser) {
            throw new UnprocessableEntityException('A user with that email already exists');
        }

        const user = new User();
        user.email = dto.email;
        user.name = dto.name;
        user.password = await this.hashPassword(dto.password);
        user.active = true;
        await this.userRepo.save(user);

        console.log('---------- register: ', user);

        return this.createToken(user);
    }

    async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.userRepo.findOne({
            where: { email: dto.email },
        });
        if (!user || !user.active) {
            throw new UnauthorizedException('Invalid username or password');
        }
        const passwordMatch = dto.password === user.password || (await bcrypt.compare(dto.password, user.password));
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid username or password');
        }
        user.lastLogin = new Date();
        await this.userRepo.save(user);

        console.log('---------- login: ', user);

        return this.createToken(user);
    }

    public createToken(user: User): LoginResponseDto {
        const accessToken = this.generateToken(user, 'access');
        const refreshToken = this.generateToken(user, 'refresh');
        return plainToClass(LoginResponseDto, {
            id: user.id,
            accessToken,
            refreshToken,
        });
    }

    public generateToken(payload: User, tokenType: 'access' | 'refresh'): string {
        const jwtSecret = config.get(`auth.${tokenType}JwtSecret`);
        const expiresIn = config.get(`auth.${tokenType}TokenExpiresIn`);
        return jwt.sign(this.prepareUserForToken(payload), jwtSecret, { expiresIn });
    }

    public prepareUserForToken(user: User): Partial<User> {
        return {
            email: user.email,
            name: user.name,
            active: user.active,
        };
    }

    public async hashPassword(pwd: string): Promise<string> {
        return bcrypt.hash(pwd, config.get('auth.bcryptRounds'));
    }

    async users(): Promise<User[]> {
        return await this.userRepo.find();
    }
}
