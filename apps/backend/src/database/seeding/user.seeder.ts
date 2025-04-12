import { Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
import { User, UserRole } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

@Injectable()
export class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    await dataSource.query(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`);
    await userRepository.save([
      {
        firstName: 'Admin',
        lastName: 'Admin',
        phoneNumber: '9800000000',
        email: 'admin@gmail.com',
        password: await hash('password', await genSalt()),
        role: UserRole.SUPER_ADMIN,
      },
      {
        firstName: 'Admin',
        lastName: 'Admin',
        phoneNumber: '9800000000',
        email: 'admin1@gmail.com',
        password: await hash('password', await genSalt()),
        role: UserRole.COMPANY_ADMIN,
      },
    ]);
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(500);
  }
}
