import { Module } from '@nestjs/common';
import { VisitOtpService } from './visit-otp.service';
import { VisitOtpController } from './visit-otp.controller';
import { MailingService } from 'src/mailing/mailing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitOtp } from './entities/visit-otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitOtp])],
  controllers: [VisitOtpController],
  providers: [VisitOtpService, MailingService],
})
export class VisitOtpModule {}
