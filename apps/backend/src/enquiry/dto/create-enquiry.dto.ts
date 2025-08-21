import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateEnquiryDto {
  @IsString()
  model: string;

  @IsString()
  @IsOptional()
  remarks: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  orgnaization: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  enquiryType: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === undefined || value === null) {
      return undefined;
    }
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'false') {
        return false;
      }
      if (value.toLowerCase() === 'true') {
        return true;
      }
    }
    return value;
  })
  isPaid: boolean;

  @IsString()
  @IsOptional()
  so: string;
}
