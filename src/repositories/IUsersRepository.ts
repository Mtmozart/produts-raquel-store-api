import { User } from '../../src/entities/User/User';
export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}
