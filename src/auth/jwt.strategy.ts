import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from 'config';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';

export type JwtPayload = Partial<User>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('auth.jwtSecret'),
        });
    }

    async validate(payload: JwtPayload, done: (e: UnauthorizedException, b: boolean | User) => void) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}
