import { Injectable, NotFoundException } from '@nestjs/common';
import { runInTransaction } from 'src/helper/transaction.helper';
import { MoreThan } from 'typeorm';
import { CreateVisitOtpDto } from './dto/create-visit-otp.dto';
import { VerifyVisitOtpDto } from './dto/verify-visit-otp.dto';
import { OtpStatus, VisitOtp } from './entities/visit-otp.entity';
import generateSecureOTP from 'src/helper/generate-otp.helper';
import { sendSms } from 'src/helper/sms.helper';

@Injectable()
export class VisitOtpService {
  async sendOtp(createVisitOtpDto: CreateVisitOtpDto) {
    const otp = generateSecureOTP();
    const { email, phoneNumber } = createVisitOtpDto;
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
      message: 'OTP has been sent. Please check your phone.',
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
