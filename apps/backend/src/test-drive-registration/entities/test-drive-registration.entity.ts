import { CommonEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

export enum RegistrationStatus {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  APPROVED = 'approved',
  COMPLETED = 'completed',
}

@Entity('test_drive_registrations')
export class TestDriveRegistration extends CommonEntity {
  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @Column({ type: 'varchar', name: 'phone_number' })
  phone: string;

  @Column({ type: 'varchar', name: 'vehicle' })
  vehicle: string;

  @Column({ type: 'varchar', name: 'address' })
  address: string;

  @Column({ type: 'timestamp', name: 'date' })
  date: string;

  @Column({ type: 'varchar', name: 'location' })
  location: string;

  @Column({ nullable: true })
  additionalInfo?: string;
  @Column({
    name: 'status',
    type: 'enum',
    enum: RegistrationStatus,
    default: RegistrationStatus.PENDING,
  })
  status: RegistrationStatus;
}
