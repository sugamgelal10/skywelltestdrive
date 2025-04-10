import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVisitOtpDto } from './dto/create-visit-otp.dto';
import generateSecureOTP from 'src/helper/generate-otp.helper';
import { sendSms } from 'src/helper/sms.helper';
import { MailingService } from 'src/mailing/mailing.service';
import { safeError } from 'src/helper/safe-error.helper';
import { OtpStatus, VisitOtp } from './entities/visit-otp.entity';
import { runInTransaction } from 'src/helper/transaction.helper';
import { VerifyVisitOtpDto } from './dto/verify-visit-otp.dto';
import { MoreThan } from 'typeorm';

@Injectable()
export class VisitOtpService {
  constructor(private readonly mailService: MailingService) {}

  async sendOtp(createVisitOtpDto: CreateVisitOtpDto) {
    const otp = generateSecureOTP();
    const { email, phoneNumber } = createVisitOtpDto;
    if (email) {
      const [_, mailErr] = await safeError(
        this.mailService.sendMail({
          body: {
            intro: [
              `Dear Visitor, Please use OTP ${otp} for further processing.`,
            ],
            signature: false,
            outro: [
              'For security reasons, it will expire in 2 minutes. If you did not request this, please ignore this email.',
              'Best regards,',
              'Town Development Fund',
              '📞 Contact: 01-4564874/ 01-4565651/ 01-4593866',
              '📧 Email: tdf@tdf.org.np',
              '🌐 Website: https://tdf.org.np/',
            ],
          },
          to: email,
          subject: 'Your OTP Code for Verification',
        }),
      );
      if (mailErr) {
        throw new InternalServerErrorException('Please Enter Valid Email');
      }
    }
    if (phoneNumber) {
      await sendSms(
        phoneNumber,
        `Dear Visitor, Please use OTP ${otp} for further processing, It will expire in 2 minutes.`,
      );
    }
    const visitOtp = new VisitOtp();
    visitOtp.email = email;
    visitOtp.phoneNumber = phoneNumber;
    visitOtp.otp = otp;
    visitOtp.status = OtpStatus.unverified;

    await runInTransaction(async (queryRunner) =>
      queryRunner.manager.save(VisitOtp, visitOtp),
    );
    return {
      message: 'OTP has been sent. Please check your email or phone.',
      success: true,
    };
  }

  async verifyOtp(verifyVisitOtpDto: VerifyVisitOtpDto) {
    const { email, phoneNumber, otp } = verifyVisitOtpDto;
    if (email || phoneNumber) {
      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() - 2);

      const visitOtp = await VisitOtp.findOne({
        where: [
          {
            phoneNumber: phoneNumber,
            otp: otp,
            status: OtpStatus.unverified,
            createdAt: MoreThan(otpExpiryTime),
          },
          {
            phoneNumber: phoneNumber,
            otp: otp,
            status: OtpStatus.unverified,
            createdAt: MoreThan(otpExpiryTime),
          },
        ],
      });

      if (!visitOtp) {
        throw new NotFoundException('Invalid OTP');
      }
      visitOtp.status = OtpStatus.verified;
      await runInTransaction(async (queryRunner) =>
        queryRunner.manager.save(VisitOtp, visitOtp),
      );
      return {
        message: 'OTP verified successfully',
        success: true,
        visit_otp_id: visitOtp.id,
      };
    } else {
      return {
        message: 'Invalid email or phone number',
        success: false,
      };
    }
  }
}
