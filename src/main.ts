import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import * as cookieParser from 'cookie-parser';
import IORedis from 'ioredis';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

import {RedisStore} from 'connect-redis'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const redis = new IORedis(config.getOrThrow<string>('REDIS_URI'));

  app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(session({
    secret: config.getOrThrow<string>('SESSION_SECRET'),
    name: config.getOrThrow<string>('SESSION_NAME'),
    resave: true,
    saveUninitialized: false,
    cookie: {
      domain: config.getOrThrow<string>('SESSION_DOMAIN'),
      maxAge: parseInt(config.getOrThrow('SESSION_MAX_AGE'), 10),
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    },
    store: new RedisStore({
      client: redis,
      prefix: config.getOrThrow<string>('SESSION_FOLDER')
    })
  }))

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'), //req only from my frontend
    credentials: true, //дозвіл вик. куки заголовки авторизації та інші об'єкти автентифікації у запитах 
    exposedHeaders: ['set-cookie'] //Додає заголовки, які браузер дозволить фронтенду бачити у відповіді.
  })

  await app.listen(config.getOrThrow<number>('APPLICATION_PORT'));
}
bootstrap();
