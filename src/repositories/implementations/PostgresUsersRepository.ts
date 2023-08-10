import { IUsersRepository } from '../IUsersRepository';
import { User } from '../../../src/entities/User/User';
import UserModel from '../../../src/entities/User/UserModel';

export class PostgresUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({
      where: { email: email },
    });
    return user ? user.toJSON() : null;
  }
  async findByEmailAndName(name: string, email: string): Promise<User | null> {
    const user = await UserModel.findOne({
      where: { name: name, email: email },
    });
    return user ? user.toJSON() : null;
  }
  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findOne({
      where: { id: id },
    });
    return user ? user.toJSON() : null;
  }

  async save(user: User): Promise<void> {
    await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
      slug: user.slug,
    });
  }
}
