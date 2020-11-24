import * as path from 'path';

module.exports = {
    envName: 'test',
    server: {
        // Problem: The app will do a request to itself when calling lambdas.
        // Therefore, we need to know on which port the app is running.
        //
        // Solution: Run the test app in a fixed port, instead of a random one.
        // Also make this port different from the default one, so we can still have the
        // main server running in a separate terminal.
        port: 4777,
    },
    db: {
        database: 'habits-db-test',
    },
};
