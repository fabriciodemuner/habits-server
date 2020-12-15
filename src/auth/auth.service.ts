import { Inject, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import { AppRepo, InjectRepo } from '../common/app.repo';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ChangePasswordDto } from './dto/change.password.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { RegisterRequestDto } from './dto/register.request.dto';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
    constructor(@InjectRepo(User) private readonly userRepo: AppRepo<User>, @Inject('UserService') private readonly userService: UserService) {}

    async register(dto: RegisterRequestDto): Promise<LoginResponseDto> {
        dto.password = await this.hashPassword(dto.password);
        const user = await this.userService.create(dto);
        return this.createToken(user);
    }

    async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.userService.getByEmail(dto.email);
        if (!user || !user.active) {
            throw new UnauthorizedException('Invalid username or password');
        }
        const passwordEqual = await bcrypt.compare(dto.password, user.password);
        if (!passwordEqual) {
            throw new UnauthorizedException('Invalid username or password');
        }
        user.lastLogin = new Date();
        await this.userRepo.save(user);
        return this.createToken(user);
    }

    async changePassword(userId: number, dto: ChangePasswordDto): Promise<boolean> {
        const user = await this.userRepo.findOne(userId);
        const passwordEqual = await bcrypt.compare(dto.currentPassword, user.password);
        if (!passwordEqual) {
            throw new UnprocessableEntityException('Current password does not match.');
        }
        user.password = await this.hashPassword(dto.newPassword);
        await this.userRepo.save(user);
        return true;
    }

    public createToken(user: User): LoginResponseDto {
        const accessToken = this.generateTokenFromUser(user, 'access');
        const refreshToken = this.generateTokenFromUser(user, 'refresh');

        return plainToClass(LoginResponseDto, {
            ...user,
            accessToken,
            refreshToken,
        });
    }

    public async hashPassword(pwd: string): Promise<string> {
        return bcrypt.hash(pwd, config.get('auth.bcryptRounds'));
    }

    public generateTokenFromUser(payload: User, tokenType: 'access' | 'refresh'): string {
        const jwtSecret = config.get('auth.jwtSecret');
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

    async validateUser(payload: JwtPayload): Promise<User> {
        if (_.isEmpty(payload) || !payload.email) {
            throw new UnprocessableEntityException('No email given');
        }
        return this.userRepo.findOne({ email: payload.email });
    }
}
