import { Module } from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { EnquiryController } from './enquiry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enquiry } from './entities/enquiry.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { TestDrive } from './entities/testdrive.entity';
import { Delivered } from './entities/delivered.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enquiry, Customer, TestDrive, Delivered]),
  ],
  controllers: [EnquiryController],
  providers: [EnquiryService],
})
export class EnquiryModule {}
