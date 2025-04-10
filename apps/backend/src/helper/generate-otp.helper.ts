import { randomInt } from 'crypto';

const generateSecureOTP = () => {
  return randomInt(1000, 10000); // Generates a number between 1000-9999
};

export default generateSecureOTP;
