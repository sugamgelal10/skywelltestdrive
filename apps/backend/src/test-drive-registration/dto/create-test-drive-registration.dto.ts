import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateTestDriveRegistrationDto {
  @IsNotEmpty({ message: 'Please enter your first name.' })
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters.' })
  firstName: string;

  @IsNotEmpty({ message: 'Please enter your last name.' })
  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters.' })
  lastName: string;

  @IsNotEmpty({ message: 'Please enter a valid email address.' })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @IsString()
  @MinLength(10, { message: 'Phone number must be at least 10 digits.' })
  @Matches(/^\d{10}$/, { message: 'Phone number must be 10 digits.' })
  @IsNotEmpty({ message: 'Please enter a valid phone number.' })
  phone: string;

  @IsString({ message: 'Please select a vehicle.' })
  @IsNotEmpty({ message: 'Please select a vehicle.' })
  vehicle: string;

  @IsString({ message: 'Please enter a valid address' })
  @IsNotEmpty({ message: 'Please enter a valid address' })
  address: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : new Date(value).toUTCString();
  })
  date: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Please enter a valid pickup location.' })
  location: string;

  @IsOptional()
  @IsString()
  additionalInfo?: string;
}
