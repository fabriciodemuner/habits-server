import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { AppExceptionFilter } from 'common/app-exception-filter';
import { DtoPipe } from 'common/dto-pipe.pipe';
import * as config from 'config';
import { AppModule } from './app.module';

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

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(4000);
}
bootstrap();
