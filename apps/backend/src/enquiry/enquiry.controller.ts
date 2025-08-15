import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { Auth } from 'src/iam/auth/decorator/auth.decorator';
import { AuthType } from 'src/iam/auth/enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('enquiry')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Post()
  create(@Body() createEnquiryDto: CreateEnquiryDto) {
    return this.enquiryService.create(createEnquiryDto);
  }

  @Get()
  findAll() {
    return this.enquiryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enquiryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnquiryDto: UpdateEnquiryDto) {
    return this.enquiryService.update(+id, updateEnquiryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enquiryService.remove(+id);
  }
}
