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

  @IsString()
  @IsOptional()
  @Transform(({ value }) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : new Date(value).toUTCString();
  })
  date: string;

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
