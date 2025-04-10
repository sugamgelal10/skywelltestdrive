import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateVisitOtpDto {
  @IsEmail()
  @IsOptional() // Email is optional unless phoneNumber is missing
  email?: string;

  @IsString()
  @IsOptional() // PhoneNumber is optional unless email is missing
  phoneNumber?: string;

  @ValidateIf((o) => !o.email && !o.phoneNumber) // Trigger validation if both are missing
  @IsNotEmpty({
    message: 'At least one of email or phoneNumber must be provided.',
  })
  dummyField?: string; // This is just a placeholder to trigger validation
}
