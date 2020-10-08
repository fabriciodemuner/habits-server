import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppExceptionFilter } from 'common/app-exception-filter';
import { DtoPipe } from 'common/dto-pipe.pipe';
import * as config from 'config';
import { AppModule } from './app.module';
import * as express from 'express';

export async function configureApp(app: NestExpressApplication) {
    // CORS
    app.enableCors();

    // Validation
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    app.useGlobalPipes(new DtoPipe());

    // REST api: filter to log exceptions
    app.useGlobalFilters(new AppExceptionFilter());

    // Listen
    const port: number = config.get('server.port');
    await app.listenAsync(port, '0.0.0.0');
}

export const bootstrap = async () => {
    const server = express();
    const app = (await NestFactory.create(AppModule, new ExpressAdapter(server))) as NestExpressApplication;
    await configureApp(app);
    return app;
};

if (require.main === module) {
    bootstrap();
}
