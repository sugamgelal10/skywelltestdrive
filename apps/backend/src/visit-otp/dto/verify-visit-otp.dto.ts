import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";

export class VerifyVisitOtpDto {
  @IsEmail()
  @IsOptional() // Email is optional unless phoneNumber is missing
  email?: string;

  @IsString()
  @IsOptional() // PhoneNumber is optional unless email is missing
  phoneNumber?: string;

  @ValidateIf((o) => !o.email && !o.phoneNumber) // Trigger validation if both are missing
  @IsNotEmpty({
    message: "At least one of email or phoneNumber must be provided.",
  })
  dummyField?: string; // This is just a placeholder to trigger validation

  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
