import { Enquiry } from 'src/enquiry/entities/enquiry.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  address?: string;

  @OneToMany(() => Enquiry, (enquiry) => enquiry.customer, { cascade: true })
  enquiry: Enquiry;
}
