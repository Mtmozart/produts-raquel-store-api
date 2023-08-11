import { ValidationServices } from '../../services/ValidationService';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ILoginUserDTO } from './ILoginUserDTO';
const bcrypt = require('bcryptjs');

export class LoginUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: ILoginUserDTO) {
    const userExists = await this.userRepository.findByEmail(data.email);

    const validationServices = new ValidationServices(
      data.email,
      data.password,
    );

    if (!validationServices.isValidEmail(data.email) === false) {
      throw new Error('Invalid email, please verify how you wrote this email.');
    }
    if (!validationServices.isValidPassword(data.password) === false) {
      throw new Error(
        'Please write the password using uppercase and lowercase letters, and special characters.',
      );
    }

    if (!userExists) {
      throw new Error('No user with this email.');
    }
    const passwordMatch = bcrypt.compareSync(
      data.password,
      userExists.password,
    );
    if (!passwordMatch) {
      throw new Error('Incorrect password.');
    }
  }
}
