import { Exclude } from 'class-transformer';
import { CommonEntity } from 'src/entities/base.entity';
import { EmployeeStatus, MaritalStatus } from 'src/enums/enums';
import { Column, Entity, Index } from 'typeorm';

export enum UserRole {
  SUPER_ADMIN = 'superAdmin',
  COMPANY_ADMIN = 'companyAdmin',
  EMPLOYEE = 'employee',
  HR = 'hr',
}

@Entity('user')
export class User extends CommonEntity {
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'varchar', unique: true })
  @Index()
  email: string;

  @Exclude()
  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  role: UserRole;

  @Column({ type: 'timestamp', nullable: true })
  dateOfBirth: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  gender: string;

  @Column({
    type: 'enum',
    enum: MaritalStatus,
    nullable: true,
  })
  maritalStatus: MaritalStatus;

  @Column({ type: 'varchar', nullable: true })
  emergencyContactName: string;

  @Column({ type: 'varchar', nullable: true })
  emergencyContactPhone: string;

  @Column({ type: 'varchar', nullable: true })
  emergencyContactRelation: string;

  @Column({ type: 'varchar', nullable: true })
  profilePicture: string;

  @Column({ type: 'timestamp', nullable: true })
  employmentStartDate: string;

  @Column({ type: 'timestamp', nullable: true })
  employmentEndDate: string;

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    nullable: true,
  })
  employmentStatus: EmployeeStatus;
}
