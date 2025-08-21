import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelService {
  async createExcelFile(data: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    worksheet.columns = [
      { header: 'SN', key: 'SN', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 30 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'Model', key: 'model', width: 20 },
      { header: 'Enquiry Type', key: 'enquiryType', width: 20 },
      { header: 'Is Paid', key: 'isPaid', width: 20 },
      { header: 'Remarks', key: 'remarks', width: 40 },
    ];
    worksheet.addRows(data);

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as Buffer;
  }
}
