import { ConnectionOptions } from 'typeorm';
import { PROD } from '../common/constants';

const db = require('config').db;
console.log('------------ db:', db);
const OrmNamingStrategy = require('./orm-naming-strategy').OrmNamingStrategy;

const ormconfig: ConnectionOptions = {
    type: 'postgres',
    schema: 'public',
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    url: db.url,
    database: db.database,
    synchronize: !PROD,
    migrationsRun: true,
    logging: db.logging,
    maxQueryExecutionTime: db.maxQueryExecutionTime,
    entities: ['src/**/**.entity{.ts,.js}'],
    // js extension is important because we run compiled files in prod
    migrations: ['src/db/migration/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/db/migration',
    },
    namingStrategy: new OrmNamingStrategy(),
};

export default ormconfig;
