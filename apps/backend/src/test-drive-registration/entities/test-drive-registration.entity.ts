import { CommonEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

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
}
