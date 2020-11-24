import { Inject } from '@nestjs/common';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import * as _ from 'lodash';
import { Connection, EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
// import { User } from '../pod/auth/user/user.entity';
import { defaultPagination } from './constants';
// import { requestContextSingleton } from './request-context';

const providerName = entity => `${entity.name}Repo`;

export const repoProviders = (entities: any[]) => {
    return entities.map(entity => ({
        provide: providerName(entity),
        useFactory: (connection: Connection) => {
            const repository = connection.getRepository(entity);
            return Object.assign(new AppRepo(), repository);
        },
        inject: [Connection],
    }));
};

export const InjectRepo = (entity: any) => Inject(providerName(entity));

@EntityRepository()
export class AppRepo<Entity> extends Repository<Entity> {
    constructor() {
        super();
    }

    public createQuery(req: QueryRequestDto): AppSelectQueryBuilder<Entity> {
        const builder = this.createQueryBuilder(this.metadata.tableName);
        const appQuery = new AppSelectQueryBuilder<Entity>(null, null);
        Object.assign(appQuery, builder);
        appQuery.req = req;
        return appQuery;
    }

    // // Override typorm's default save with a wrapper which adds the current user's id
    // // If updatedBy doesn't exist on the target entity, this is ignored

    // // NOTE: this assumes that every entity has a PrimaryGeneratedColumn
    // save<T extends TypeOrmDeepPartial<Entity>>(inputEntity: T, options?: SaveOptions): Promise<T & Entity> {
    //     const entity: T & { id?: any; updatedBy?: User; createdBy?: User } = inputEntity;
    //     const user = requestContextSingleton.request?.user;

    //     if (typeof entity.id !== 'undefined') {
    //         entity.updatedBy = user;
    //     } else {
    //         entity.createdBy = user;
    //     }
    //     return super.save(entity, options);
    // }
}

@Exclude()
export class QueryRequestDto {
    @IsOptional()
    @Expose()
    @IsInt()
    @Min(1)
    @Max(500)
    @Type(() => Number)
    limit: number;

    @IsOptional()
    @Expose()
    @Min(0)
    @IsInt()
    @Type(() => Number)
    offset: number;

    @Expose()
    order?: {
        by: string;
        direction: 'ASC' | 'DESC';
    }[];

    @IsOptional()
    @Expose()
    filter?: any;
}

@Exclude()
export class QueryResponseDto {
    @Expose()
    data: any[];

    @Expose()
    limit: number;

    @Expose()
    offset: number;

    @Expose()
    total: number;
}

export interface IExecuteQueryOptions {
    useOffsetLimit?: boolean;
}
class AppSelectQueryBuilder<Entity> extends SelectQueryBuilder<Entity> {
    public req: QueryRequestDto;

    private mapOrderToCriteria(
        order: {
            by: string;
            direction: 'ASC' | 'DESC';
        }[],
    ) {
        return _.reduce(
            order,
            (obj, item) => {
                const key = `${this.alias}.${item.by}`;
                obj[key] = _.toUpper(item.direction);
                return obj;
            },
            {},
        );
    }

    async _execute(options?: IExecuteQueryOptions): Promise<QueryResponseDto> {
        const offset = this.req.offset || defaultPagination.offset;
        const limit = this.req.limit || defaultPagination.limit;
        if (options && options.useOffsetLimit) {
            this.offset(offset);
            this.limit(limit);
        } else {
            this.skip(offset);
            this.take(limit);
        }

        if (this.req.order) {
            this.orderBy(this.mapOrderToCriteria(this.req.order));
        } else if (Object.keys(this.expressionMap.orderBys).length === 0) {
            this.orderBy(`${this.alias}.id`, 'ASC');
        }
        const [data, total] = await this.getManyAndCount();

        return {
            data,
            limit,
            offset,
            total,
        };
    }
}
