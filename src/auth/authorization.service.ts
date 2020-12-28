import { Injectable, NotFoundException } from '@nestjs/common';
import { AppRepo, InjectRepo } from '../common/app.repo';
import { Habit } from '../habit/habit.entity';
import { ApiRequest } from './app.guard';
import { User } from '../user/user.entity';

export type EntityType = 'Habit';
export type ResourcePair = EntityType | [EntityType, string];

@Injectable()
export class AuthorizationService {
    constructor(@InjectRepo(Habit) private habitRepo: AppRepo<Habit>) {}

    async isUserAuthorized(req: ApiRequest, resource: ResourcePair): Promise<boolean> {
        resource = Array.isArray(resource) ? resource : [resource, `${resource.toLowerCase()}Id`];
        const owner = await this.getResourceOwner(req, resource);

        if (owner && owner.id === req.user.id) {
            return true;
        }

        // 404 instead of 403 for security reasons
        throw new NotFoundException(`Could not find ${resource[0]}.`);
    }

    private async getResourceOwner(req: ApiRequest, resource: ResourcePair): Promise<User> {
        const [entityType, routeParam] = resource;
        const id = req.params[routeParam];
        if (entityType === 'Habit') {
            return (
                await this.habitRepo.findOneOrFail({
                    where: { id },
                    relations: ['user'],
                })
            ).user;
        }
    }
}
