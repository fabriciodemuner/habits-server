import { Controller, Get } from '@nestjs/common';
import { Permissions } from '../auth/app.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @Permissions({ public: true })
    async users(): Promise<User[]> {
        return await this.userService.users();
    }
}
