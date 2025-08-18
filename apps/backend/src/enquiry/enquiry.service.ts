import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enquiry } from './entities/enquiry.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { EmailService } from 'src/helper/mailing/mailing.service';
import { emailOnContactTemplate } from 'src/helper/mailing/html-as-constants/automatic-email-on-contact-us';

@Injectable()
export class EnquiryService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepository: Repository<Enquiry>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly emailService: EmailService,
  ) {}

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
    };
    const customer = await this.preloadCustomer(customerData);
    const enquiry = this.enquiryRepository.create({
      model: createEnquiryDto.model,
      remarks: createEnquiryDto.remarks,
      enquiryType: createEnquiryDto.enquiryType,
      customer,
    });

    await this.enquiryRepository.save(enquiry);
    await this.emailService.sendMail(
      createEnquiryDto.email,
      `Greetings from Skywell Nepal`,
      emailOnContactTemplate,
      {},
    );
    return 'New Enquiry Addedp';
  }

  findAll() {
    return this.enquiryRepository.find({
      relations: ['customer'],
    });
  }

  findOne(id: number) {
    const enquiry = this.enquiryRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!enquiry) throw new NotFoundException('Enquiry Not Found');
    return enquiry;
  }

  update(id: number, updateEnquiryDto: UpdateEnquiryDto) {
    return `This action updates a #${id} enquiry`;
  }

  remove(id: number) {
    return `This action removes a #${id} enquiry`;
  }
}
