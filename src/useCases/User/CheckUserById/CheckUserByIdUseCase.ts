import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { CheckUserByIdDTO } from './CheckUserByIdDTO';

class CheckUserByIdUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: CheckUserByIdDTO) {
    const user = await this.userRepository.findBySlug(data.slug);

    if (!user) {
      throw new Error('User not exits');
    }

    return user;
  }
}

export { CheckUserByIdUseCase };
