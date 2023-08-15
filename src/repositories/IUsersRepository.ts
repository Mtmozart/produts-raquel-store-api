import { User } from '../../src/entities/User/User';
export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findByEmailAndName(email: string, name: string): Promise<User>;
  findById(id: string);
  findBySlug(slug: string);
  save(user: User): Promise<void>;
}
