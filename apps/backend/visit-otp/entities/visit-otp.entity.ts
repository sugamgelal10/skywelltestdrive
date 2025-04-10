import { CommonEntity } from 'src/entities/common.entity';
import { Column, Entity } from 'typeorm';

export enum OtpStatus {
  verified = 'verified',
  unverified = 'unverified',
}
@Entity()
export class VisitOtp extends CommonEntity {
  @Column({ name: 'email', type: 'varchar', nullable: true })
  email: string;

  @Column({ name: 'phone_number', type: 'varchar', nullable: true })
  phoneNumber: string;

  @Column({ name: 'otp', type: 'integer' })
  otp: number;

  @Column({ name: 'status', type: 'varchar', default: OtpStatus.unverified })
  status: string;
}
