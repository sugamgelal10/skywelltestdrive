import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './database/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await AppDataSource.initialize()
    .then(() => {
      logger.log('Data Source has been initialized!');
    })
    .catch((err) => {
      logger.error('Error during Data Source initialization:', err);
    });

  // Swagger setup
  const configService = app.get<ConfigService>(ConfigService);
  const env: string = configService.get('APP_ENV') || 'development';
  if (env.toUpperCase() !== 'PRODUCTION') {
    const config = new DocumentBuilder()
      .setTitle('SKYWELL  Apis')
      .setDescription('Description goes here')
      .setVersion('1.0')
      .addTag('SKYWELL ')
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, documentFactory, {
      customSiteTitle: 'SKYWELL  API Documentation',
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
