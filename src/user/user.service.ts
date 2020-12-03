import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { RegisterRequestDto } from '../auth/dto/register.request.dto';
import { AppRepo, InjectRepo } from '../common/app.repo';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepo(User) private userRepo: AppRepo<User>) {}

    public async getByEmail(email: string): Promise<User> {
        return this.userRepo.findOneOrFail({ email });
    }

    public async create(dto: RegisterRequestDto): Promise<User> {
        const existingUser = await this.userRepo.findOne({ email: dto.email });
        if (existingUser) {
            throw new UnprocessableEntityException('A user with that email already exists');
        }

        const user = new User();
        user.email = dto.email;
        user.name = dto.name;
        user.password = dto.password;
        user.active = true;
        await this.userRepo.save(user);

        return user;
    }

    async users(): Promise<User[]> {
        return await this.userRepo.find();
    }
}
