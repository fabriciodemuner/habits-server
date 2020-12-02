import { ConnectionOptions } from 'typeorm';
import * as config from 'config';
import { OrmNamingStrategy } from './orm-naming-strategy';

const db = config.db;

const ormconfig: ConnectionOptions = {
    type: 'postgres',
    schema: 'public',
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    url: db.url,
    database: db.database,
    synchronize: false,
    migrationsRun: true,
    logging: db.logging,
    maxQueryExecutionTime: db.maxQueryExecutionTime,
    entities: ['dist/src/**/**.entity.js'],
    // js extension is important because we run compiled files in prod
    migrations: ['dist/src/db/migration/*.js'],
    cli: {
        migrationsDir: 'src/db/migration',
    },
    namingStrategy: new OrmNamingStrategy(),
};

export = ormconfig;
