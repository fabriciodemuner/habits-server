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
    entities: ['dist/src/**/**.entity.js'],
    // js extension is important because we run compiled files in prod
    migrations: ['dist/src/db/migration/*.js'],
    cli: {
        migrationsDir: 'src/db/migration',
    },
    namingStrategy: new OrmNamingStrategy(),
};

console.log('--------- ormconfig:', ormconfig);

export = ormconfig;
