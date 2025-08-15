import { IsOptional, IsString } from 'class-validator';
export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;
}
