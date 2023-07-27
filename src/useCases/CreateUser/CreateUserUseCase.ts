import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../../src/entities/User/User';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExits = this.usersRepository.findByEmail(data.email);

    if (userAlreadyExits) {
      throw new Error('Use already exists');
    }

    const user = new User({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    await this.usersRepository.save(user);
  }
}
