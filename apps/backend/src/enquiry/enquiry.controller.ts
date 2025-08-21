import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { Auth } from 'src/iam/auth/decorator/auth.decorator';
import { AuthType } from 'src/iam/auth/enums/auth-type.enum';
import { Response } from 'express';

@Auth(AuthType.None)
@Controller('enquiry')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Get('export')
  async export(@Res() res: Response) {
    try {
      const buffer = await this.enquiryService.export();
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=enquiry.xlsx');
      res.send(buffer);
    } catch (error) {
      console.error(error);
    }
  }

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
