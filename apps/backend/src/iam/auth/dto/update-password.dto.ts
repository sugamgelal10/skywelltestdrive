import { IsString, MinLength } from 'class-validator';
import { Match } from '../decorator/match.decorator';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  oldPassword: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  newPassword: string;

  @IsString()
  @Match('newPassword', { message: 'Passwords do not match' })
  confirmNewPassword: string;
}

export class UpdatePasswordResponseDto {
  message: string;
  success: boolean;
}
