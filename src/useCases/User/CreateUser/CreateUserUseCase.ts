import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../../src/entities/User/User';
import { ValidationServices } from '../../services/ValidationService';
import { HashEncryption } from '../../services/Encryption';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExits = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExits) {
      throw new Error('User already exits');
    }

    const validationServices = new ValidationServices(
      data.name,
      data.email,
      data.password,
    );

    if (validationServices.isValidName(data.name) === false) {
      throw new Error(
        'Invalid characters found in the name. Please use only letter and spaces.',
      );
    }
    if (validationServices.isValidEmail(data.email) === false) {
      throw new Error('Invalid email, please verify how you wrote this email.');
    }

    if (validationServices.isValidPassword(data.password) === false) {
      throw new Error(
        'Please write the password using uppercase and lowercase letters, and special characters.',
      );
    }

    const hashEncryption = new HashEncryption();

    const hashedPassword = hashEncryption.encryptedPassword(data.password);

    try {
      const user = new User({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        slug: data.slug,
      });

      await this.usersRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
