import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enquiry } from './entities/enquiry.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { EmailService } from 'src/helper/mailing/mailing.service';
import { emailOnContactTemplate } from 'src/helper/mailing/html-as-constants/automatic-email-on-contact-us';
import { emailOnBookingTemplate } from 'src/helper/mailing/html-as-constants/automatic-email-on-booking';
import { ExcelService } from 'src/helper/excel/excel.service';
import { TestDrive } from './entities/testdrive.entity';
import { Delivered } from './entities/delivered.entity';

@Injectable()
export class EnquiryService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepository: Repository<Enquiry>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectRepository(TestDrive)
    private readonly testDriveRepository: Repository<TestDrive>,

    @InjectRepository(Delivered)
    private readonly deliveredRepository: Repository<Delivered>,
    private readonly emailService: EmailService,
    private readonly excelService: ExcelService,
  ) {}

  private generateRandomToken(length = 7): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      token += chars[randomIndex];
    }
    return token;
  }

  async preloadCustomer(customerData: Partial<Customer>): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { phone: customerData.phone },
    });
    if (customer) return customer;
    const newCustomer = this.customerRepository.create(customerData);
    return await this.customerRepository.save(newCustomer);
  }
  async create(createEnquiryDto: CreateEnquiryDto) {
    const customerData: Partial<Customer> = {
      name: createEnquiryDto.name,
      email: createEnquiryDto.email,
      address: createEnquiryDto.address,
      phone: createEnquiryDto.phone,
      orgnaization: createEnquiryDto.orgnaization,
    };
    const customer = await this.preloadCustomer(customerData);

    const testDrive = await this.testDriveRepository.save({
      date: createEnquiryDto.date,
    });
    const enquiry = this.enquiryRepository.create({
      model: createEnquiryDto.model,
      remarks: createEnquiryDto.remarks,
      enquiryType: createEnquiryDto.enquiryType,
      isPaid: createEnquiryDto.isPaid,
      so: createEnquiryDto.so,
      clientStatus: createEnquiryDto.clientStatus,
      customer,
      testDrive,
    });

    await this.enquiryRepository.save(enquiry);
    await this.emailService.sendMail(
      createEnquiryDto.email,
      `Greetings from Skywell Nepal`,
      createEnquiryDto.isPaid ? emailOnBookingTemplate : emailOnContactTemplate,
      {},
    );
    return 'New Enquiry Addedp';
  }

  findAll() {
    return this.enquiryRepository.find({
      relations: ['customer', 'delivered', 'testDrive'],
    });
  }

  findOne(id: number) {
    const enquiry = this.enquiryRepository.findOne({
      where: { id },
      relations: ['customer', 'delivered', 'testDrive'],
    });
    if (!enquiry) throw new NotFoundException('Enquiry Not Found');
    return enquiry;
  }

  async update(id: number, updateEnquiryDto: UpdateEnquiryDto) {
    const enquiry = await this.findOne(id); // Fetch enquiry with relations

    // Handle marking as delivered
    if (updateEnquiryDto.isDelivered === true) {
      if (enquiry.delivered) {
        throw new BadRequestException('Enquiry Already Delivered');
      }

      const delivered = await this.deliveredRepository.save({
        date: new Date(),
        token: this.generateRandomToken(),
      });

      enquiry.delivered = delivered;
      await this.enquiryRepository.save(enquiry);
    }

    // Handle marking as not delivered
    else if (updateEnquiryDto.isDelivered === false) {
      if (enquiry.delivered) {
        const deliveredToRemove = enquiry.delivered;

        // 1. Break relation
        enquiry.delivered = null;
        await this.enquiryRepository.save(enquiry);

        // 2. Remove delivered entity safely
        await this.deliveredRepository.remove(deliveredToRemove);
      }
    }

    return 'Enquiry Updated Successfully';
  }

  remove(id: number) {
    return `This action removes a #${id} enquiry`;
  }

  async export() {
    const enquiry = await this.enquiryRepository.find({
      relations: ['customer'],
    });
    const data = enquiry.map((enquiry, idx: number) => ({
      SN: idx + 1,
      name: enquiry.customer.name,
      phone: enquiry.customer.phone,
      email: enquiry.customer.email,
      address: enquiry.customer.address,
      model: enquiry.model,
      enquiryType: enquiry.enquiryType,
      isPaid: enquiry.isPaid,
      remarks: enquiry.remarks,
      salesOfficer: enquiry.so,
    }));

    return await this.excelService.createExcelFile(data);
  }
}
