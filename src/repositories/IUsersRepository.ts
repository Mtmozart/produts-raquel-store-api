import { User } from '../../src/entities/User/User';
export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findByEmailAndName(email: string, name: string): Promise<User>;
  save(user: User): Promise<void>;
}
