import { Customer } from 'src/customer/entities/customer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Enquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column({ nullable: true })
  remarks?: string;

  @ManyToOne(() => Customer, (customer) => customer.enquiry)
  customer: Customer;
}
