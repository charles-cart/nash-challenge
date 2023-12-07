import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

const prefix = 'api/v1';
const swagger = `/${prefix}/docs`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication');

  app.enableCors({
    origin: true,
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS,PATCH',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix(prefix);
  const configService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('Nash API')
    .setVersion('1.0')
    .setContact('Charles Team', '', 'charles29.dev@gmail.com')
    .setDescription('Nash challenge - order book snapshot.')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swagger, app, document, {
    customSiteTitle: 'Backend Generator',
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(configService.get<number>('APP_PORT') || 3000, async () => {
    logger.log(`Server running in ${await app.getUrl()}${swagger}`);
  });
}

bootstrap();
