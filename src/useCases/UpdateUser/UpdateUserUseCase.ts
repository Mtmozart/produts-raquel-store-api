import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUpdateUserRequestDTO } from './UpdateUserDTO';
import { User } from '../../../src/entities/User/User';
import { ValidationServices } from '../../services/ValidationService';
import { HashEncryption } from '../../services/Encryption';

class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IUpdateUserRequestDTO) {
    const updateUser = await this.usersRepository.findById(data.id);
    //checked if user exits
    if (!updateUser) {
      throw new Error('Denied access');
    }
    //Execute the logics for securties
    const verifyIfEmailExists = await this.usersRepository.findByEmail(
      data.email,
    );
    if (verifyIfEmailExists && verifyIfEmailExists != updateUser.email) {
      throw new Error('The email already have used by other user');
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
        id: updateUser.id,
        name: data.name,
        email: data.email,
        password: hashedPassword,
        slug: data.slug,
      });

      await this.usersRepository.update(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { UpdateUserUseCase };
