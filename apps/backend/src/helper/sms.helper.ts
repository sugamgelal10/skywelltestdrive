import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
export async function sendSms(mobile: string, message: string) {
  
  try {
    const response = await axios({
      method: 'POST',
      url: process.env.SMS_URL,
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        message: message,
        mobile: mobile,
      },
    });
    return response;
  } catch (error) {
    throw (
      new BadRequestException(error.response?.data?.message) || error.message
    );
  }
}
