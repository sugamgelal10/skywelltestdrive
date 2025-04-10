import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDriveRegistrationDto } from './dto/create-test-drive-registration.dto';
import { UpdateTestDriveRegistrationDto } from './dto/update-test-drive-registration.dto';
import { TestDriveRegistration } from './entities/test-drive-registration.entity';
import { runInTransaction } from 'src/helper/transaction.helper';
import { safeError } from 'src/helper/safe-error.helper';

@Injectable()
export class TestDriveRegistrationService {
  constructor(
    @InjectRepository(TestDriveRegistration)
    private readonly testDriveRegistrationRepository: Repository<TestDriveRegistration>,
  ) {}
  create(createTestDriveRegistrationDto: CreateTestDriveRegistrationDto) {
    const testDriveRegistration = new TestDriveRegistration();
    testDriveRegistration.firstName = createTestDriveRegistrationDto.firstName;
    testDriveRegistration.lastName = createTestDriveRegistrationDto.lastName;
    testDriveRegistration.email = createTestDriveRegistrationDto.email;
    testDriveRegistration.phone = createTestDriveRegistrationDto.phone;
    testDriveRegistration.vehicle = createTestDriveRegistrationDto.vehicle;
    testDriveRegistration.address = createTestDriveRegistrationDto.address;
    testDriveRegistration.date = createTestDriveRegistrationDto.date;
    testDriveRegistration.location = createTestDriveRegistrationDto.location;
    testDriveRegistration.additionalInfo =
      createTestDriveRegistrationDto.additionalInfo;
    return runInTransaction((queryRunner) =>
      queryRunner.manager.save(TestDriveRegistration, testDriveRegistration),
    );
  }

  async findAll() {
    const [testDriveRegistrations, error] = await safeError(
      this.testDriveRegistrationRepository.find(),
    );
    if (error) {
      throw new InternalServerErrorException(
        'Error fetching test drive registrations',
      );
    }
    if (testDriveRegistrations.length === 0) {
      throw new NotFoundException('No test drive registrations found');
    }
    return testDriveRegistrations;
  }

  async findOne(id: number) {
    const [testDriveRegistration, error] = await safeError(
      this.testDriveRegistrationRepository.findOne({ where: { id } }),
    );
    if (error) {
      throw new InternalServerErrorException(
        'Error fetching test drive registration',
      );
    }
    if (!testDriveRegistration) {
      throw new NotFoundException(
        `Test drive registration with id ${id} not found`,
      );
    }
    return testDriveRegistration;
  }

  async update(
    id: number,
    updateTestDriveRegistrationDto: UpdateTestDriveRegistrationDto,
  ) {
    const testDriveRegistration = await this.findOne(id);
    updateTestDriveRegistrationDto.firstName
      ? (testDriveRegistration.firstName =
          updateTestDriveRegistrationDto.firstName)
      : (testDriveRegistration.firstName = testDriveRegistration.firstName);
    updateTestDriveRegistrationDto.lastName
      ? (testDriveRegistration.lastName =
          updateTestDriveRegistrationDto.lastName)
      : (testDriveRegistration.lastName = testDriveRegistration.lastName);
    updateTestDriveRegistrationDto.email
      ? (testDriveRegistration.email = updateTestDriveRegistrationDto.email)
      : (testDriveRegistration.email = testDriveRegistration.email);
    updateTestDriveRegistrationDto.phone
      ? (testDriveRegistration.phone = updateTestDriveRegistrationDto.phone)
      : (testDriveRegistration.phone = testDriveRegistration.phone);
    updateTestDriveRegistrationDto.vehicle
      ? (testDriveRegistration.vehicle = updateTestDriveRegistrationDto.vehicle)
      : (testDriveRegistration.vehicle = testDriveRegistration.vehicle);
    updateTestDriveRegistrationDto.address
      ? (testDriveRegistration.address = updateTestDriveRegistrationDto.address)
      : (testDriveRegistration.address = testDriveRegistration.address);
    updateTestDriveRegistrationDto.date
      ? (testDriveRegistration.date = updateTestDriveRegistrationDto.date)
      : (testDriveRegistration.date = testDriveRegistration.date);
    updateTestDriveRegistrationDto.location
      ? (testDriveRegistration.location =
          updateTestDriveRegistrationDto.location)
      : (testDriveRegistration.location = testDriveRegistration.location);
    updateTestDriveRegistrationDto.additionalInfo
      ? (testDriveRegistration.additionalInfo =
          updateTestDriveRegistrationDto.additionalInfo)
      : (testDriveRegistration.additionalInfo =
          testDriveRegistration.additionalInfo);
    updateTestDriveRegistrationDto.status
      ? (testDriveRegistration.status = updateTestDriveRegistrationDto.status)
      : (testDriveRegistration.status = testDriveRegistration.status);
    return runInTransaction((queryRunner) =>
      queryRunner.manager.save(TestDriveRegistration, testDriveRegistration),
    );
  }

  async remove(id: number) {
    const testDriveRegistration = await this.findOne(id);
    return runInTransaction((queryRunner) =>
      queryRunner.manager.remove(TestDriveRegistration, testDriveRegistration),
    );
  }
}
