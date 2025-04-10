import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/user/entities/user.entity';
import { SignUpDto } from './sign-up.dto';
import { EmployeeStatus, MaritalStatus } from 'src/enums/enums';
import { Match } from '../decorator/match.decorator';

export class UserUpdateDto extends PartialType(SignUpDto) {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;

  @IsString()
  @IsOptional()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword?: string;

  @IsEnum(UserRole)
  @IsOptional()
  @Transform(({ value }) => value ?? UserRole.EMPLOYEE)
  role?: UserRole;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : new Date(value).toUTCString();
  })
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsEnum(MaritalStatus)
  @IsOptional()
  maritalStatus?: MaritalStatus;

  @IsString()
  @IsOptional()
  emergencyContactName?: string;

  @IsString()
  @IsOptional()
  emergencyContactPhone?: string;

  @IsString()
  @IsOptional()
  emergencyContactRelation?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  profilePicture?: any;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : new Date(value).toUTCString();
  })
  employmentStartDate?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : new Date(value).toUTCString();
  })
  employmentEndDate?: string;

  @IsEnum(EmployeeStatus)
  @IsOptional()
  employmentStatus?: EmployeeStatus;
}
