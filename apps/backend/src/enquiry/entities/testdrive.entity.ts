import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Enquiry } from './enquiry.entity';

@Entity()
export class TestDrive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ nullable: true })
  isCompleted: boolean;

  @OneToOne(() => Enquiry, (enquiry) => enquiry.testDrive)
  enquiry: Enquiry;
}
