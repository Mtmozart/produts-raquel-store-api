import { IUserRepository } from '../../repositories/IUserRepostiory';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../entities/User';

export class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExits = this.usersRepository.findByEmail(data.email);

    if (userAlreadyExits) {
      throw new Error('Use already exists');
    }

    const user = new User(data);

    await this.usersRepository.save(user);
  }
}