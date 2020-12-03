require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;

const development = {
    server: {
        externalUrl: `http://localhost:${port}/`,
        port,
    },
    db: {
        host: process.env.DATABASE_URL || 'localhost',
        port: 5432,
        username: 'pguser',
        password: 'pgpass',
        database: 'habits-tracker-db',
        maxQueryExecutionTime: null,
    },
    auth: {
        bcryptRounds: 10,
        accessJwtSecret: process.env.ACCESS_JWT_SECRET,
        refreshJwtSecret: process.env.REFRESH_JWT_SECRET,
        accessTokenExpiresIn: 60 * 60,
        refreshTokenExpiresIn: 60 * 60 * 24 * 7,
    },
};

const production = {
    server: {
        externalUrl: 'https://habits-tracker-be.herokuapp.com/',
        port,
    },
    db: {
        url: process.env.DATABASE_URL,
        // host: process.env.DATABASE_URL || 'localhost',
        // port: 5432,
        // username: 'pguser',
        // password: 'pgpass',
        // database: 'habits-tracker-db',
        maxQueryExecutionTime: null,
    },
};

const test = {
    server: {
        port: 4777,
    },
    db: {
        database: 'habits-db-test',
    },
};

const config = {
    development,
    production,
    test,
};

module.exports = config[env];
