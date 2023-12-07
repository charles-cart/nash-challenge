import * as Joi from 'joi';

import { BooksModule } from './modules/books/books.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { Module } from '@nestjs/common';
import env from './config/environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
      validationSchema: Joi.object().keys({
        BITMART_BASE_URL: Joi.string().required(),
        BITMART_SPLITTER: Joi.string().required(),
        BITMART_PATHS: Joi.string().trim().required(),
        BINANCE_BASE_URL: Joi.string().required(),
        BINANCE_SPLITTER: Joi.string().allow('').required(),
        BINANCE_PATHS: Joi.string().trim().required(),
      }),
    }),
    HealthModule,
    BooksModule,
  ],
})
export class AppModule {}
