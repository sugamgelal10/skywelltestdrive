import { PartialType } from '@nestjs/swagger';
import { CreateTestDriveRegistrationDto } from './create-test-drive-registration.dto';

export class UpdateTestDriveRegistrationDto extends PartialType(
  CreateTestDriveRegistrationDto,
) {}
