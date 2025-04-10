import { PartialType } from '@nestjs/swagger';
import { CreateTestDriveRegistrationDto } from './create-test-drive-registration.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { RegistrationStatus } from '../entities/test-drive-registration.entity';

export class UpdateTestDriveRegistrationDto extends PartialType(
  CreateTestDriveRegistrationDto,
) {
  @IsEnum(RegistrationStatus)
  @IsNotEmpty()
  status: RegistrationStatus;
}
