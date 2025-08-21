import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { IamModule } from './iam/iam.module';
import { UserModule } from './user/user.module';
import { TestDriveRegistrationModule } from './test-drive-registration/test-drive-registration.module';
import { VisitOtpModule } from './visit-otp/visit-otp.module';
import { CustomerModule } from './customer/customer.module';
import { EnquiryModule } from './enquiry/enquiry.module';

import { ExcelModule } from './helper/excel/excel.module';
import { MailingModule } from './helper/mailing/mailing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_TOKEN_ISSUER: Joi.string().required(),
        JWT_TOKEN_AUDIENCE: Joi.string().required(),
        JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
        JWT_REFRESH_TOKEN_TTL: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    UserModule,
    IamModule,
    VisitOtpModule,
    TestDriveRegistrationModule,
    CustomerModule,
    EnquiryModule,
    MailingModule,
    ExcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
