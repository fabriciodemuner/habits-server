const db = require('config').db;
console.log('------------------ db:', db);

const OrmNamingStrategy = require('./orm-naming-strategy').OrmNamingStrategy;

module.exports = {
    type: 'postgres',
    schema: 'public',
    keepConnectionAlive: true, // otherwise tests go apeshit
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.database,
    synchronize: true,
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
