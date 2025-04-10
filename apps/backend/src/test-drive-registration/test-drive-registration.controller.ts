import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTestDriveRegistrationDto } from './dto/create-test-drive-registration.dto';
import { UpdateTestDriveRegistrationDto } from './dto/update-test-drive-registration.dto';
import { TestDriveRegistrationService } from './test-drive-registration.service';

@Controller('test-drive-registration')
export class TestDriveRegistrationController {
  constructor(
    private readonly testDriveRegistrationService: TestDriveRegistrationService,
  ) {}

  @Post()
  create(
    @Body() createTestDriveRegistrationDto: CreateTestDriveRegistrationDto,
  ) {
    return this.testDriveRegistrationService.create(
      createTestDriveRegistrationDto,
    );
  }

  @Get()
  findAll() {
    return this.testDriveRegistrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testDriveRegistrationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestDriveRegistrationDto: UpdateTestDriveRegistrationDto,
  ) {
    return this.testDriveRegistrationService.update(
      +id,
      updateTestDriveRegistrationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testDriveRegistrationService.remove(+id);
  }
}
