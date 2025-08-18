import { IsOptional, IsString } from 'class-validator';

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
  address: string;

  @IsString()
  @IsOptional()
  enquiryType: string;
}
