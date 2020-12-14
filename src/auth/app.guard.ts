import { ExecutionContext, Inject, Injectable, NotFoundException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { User } from '../user/user.entity';
import { AuthorizationService, ResourcePair } from './authorization.service';

export type ApiRequest = ExpressRequest & {
    user?: User;
};
export type ApiLoginRequest = ExpressRequest & { user: User };
export type ApiKeyRequest = ExpressRequest & { user: User };

export interface CanAccess {
    adminOnly?: boolean;
    public?: boolean;
    resource?: ResourcePair;
}

export const Permissions = (canAccess: CanAccess) => {
    return SetMetadata('canAccess', canAccess);
};

@Injectable()
export class AppGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector, @Inject('AuthorizationService') private authorizationService: AuthorizationService) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const ctrlFunc = context.getHandler();
        const canAccess: CanAccess = this.reflector.get('canAccess', ctrlFunc) || {};

        if (canAccess.public) {
            return true;
        }

        await super.canActivate(context);

        const req = context.switchToHttp().getRequest();

        if (canAccess.adminOnly) {
            if (req.user.isAdmin()) {
                return true;
            }
            // 404 instead of 403 for security reasons
            throw new NotFoundException('Not Found');
        }

        if (!canAccess.resource) {
            return true;
        }

        return await this.authorizationService.isUserAuthorized(req, canAccess.resource);
    }
}
