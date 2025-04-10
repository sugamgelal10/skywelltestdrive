import { User, UserRole } from 'src/user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
export const UserFactory = setSeederFactory(User, (faker) => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.phoneNumber = faker.phone.number();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.role = faker.helpers.objectValue(UserRole);
  return user;
});
