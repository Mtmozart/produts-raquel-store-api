import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CheckUserByIdDTO } from './CheckUserByIdDTO';

class CheckUserByIdUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: CheckUserByIdDTO) {
    const user = await this.userRepository.findBySlug(data.slug);
    const idToken = data.tokenId;
    if (!user) {
      throw new Error('User not exits');
    }
    const userById = await this.userRepository.findById(idToken);

    if (userById.id !== user.id) {
      throw new Error('Denied access');
    }

    return user;
  }
}

export { CheckUserByIdUseCase };
