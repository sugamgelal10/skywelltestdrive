import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { mailOptions } from 'src/dto/mailFormat.dto';
import { safeError } from './safe-error.helper';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: Number(this.configService.get<number>('MAIL_PORT')),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendEmail(emailDetails: mailOptions): Promise<any> {
    const { from, receipients, subject, html } = emailDetails;
    const mailOpts: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
      },
      to: receipients,
      subject,
      html,
    };

    const [result, error] = await safeError(
      this.transporter.sendMail(mailOpts),
    );
    if (error) {
      throw new InternalServerErrorException(
        'Could not complete sending Emails.',
      );
    }
    return result;
  }
}
