import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enquiry } from './enquiry.entity';

@Entity()
export class Delivered {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column({ nullable: true })
  token: string;

  @OneToOne(() => Enquiry, (enquiry) => enquiry.delivered)
  enquiry: Enquiry;
}
