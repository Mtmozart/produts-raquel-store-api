import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../../src/entities/User/User';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExits = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExits) {
      throw new Error('User already exits');
    }
    try {
      const user = new User({
        name: data.name,
        email: data.email,
        password: data.password,
        slug: data.slug,
      });

      await this.usersRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
