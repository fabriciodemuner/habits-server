import { Injectable } from '@nestjs/common';
import { InjectRepo, AppRepo } from '../common/app.repo';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepo(User) private habitRepo: AppRepo<User>) {}

    async users(): Promise<User[]> {
        return await this.habitRepo.find();
    }
}
