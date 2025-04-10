import { UserRole } from 'src/user/entities/user.entity';

export interface ActiveUserData {
  sub: number;
  email: string;
  role: UserRole;
  tokenType?: 'access';
}
