require('dotenv').config();
require('dotenv').config({
    path: './.env.public',
});
const path = require('path');

const port = process.env.PORT ? process.env.PORT : 4000;

module.exports = {
    envName: 'default',
    db: {
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'habits-tracker-db',
        maxQueryExecutionTime: null,
    },
    server: {
        externalUrl: `http://localhost:${port}/`,
        port,
    },
};
