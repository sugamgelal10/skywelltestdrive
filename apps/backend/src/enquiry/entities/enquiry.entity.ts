import { Customer } from 'src/customer/entities/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestDrive } from './testdrive.entity';
import { Delivered } from './delivered.entity';

@Entity()
export class Enquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column({ nullable: true })
  remarks?: string;

  @Column({ nullable: true })
  enquiryType: string;

  @Column({ nullable: true })
  isPaid: boolean;

  @Column({ nullable: true })
  so: string;

  @Column({ nullable: true })
  clientStatus: string;

  @ManyToOne(() => Customer, (customer) => customer.enquiry)
  customer: Customer;

  @OneToOne(() => TestDrive, (testDrive) => testDrive.enquiry)
  @JoinColumn({ name: 'test_drive_id' })
  testDrive: TestDrive;

  @OneToOne(() => Delivered, (delivered) => delivered.enquiry, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'delivered_id' })
  delivered: Delivered;
}
