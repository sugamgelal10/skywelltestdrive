import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestDriveRegistration } from './entities/test-drive-registration.entity';
import { TestDriveRegistrationController } from './test-drive-registration.controller';
import { TestDriveRegistrationService } from './test-drive-registration.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestDriveRegistration])],
  controllers: [TestDriveRegistrationController],
  providers: [TestDriveRegistrationService],
})
export class TestDriveRegistrationModule {}
