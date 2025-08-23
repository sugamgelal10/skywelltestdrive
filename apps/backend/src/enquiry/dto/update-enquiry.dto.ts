import { PartialType } from '@nestjs/swagger';
import { CreateEnquiryDto } from './create-enquiry.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateEnquiryDto extends PartialType(CreateEnquiryDto) {
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
  isDelivered: boolean;
}
