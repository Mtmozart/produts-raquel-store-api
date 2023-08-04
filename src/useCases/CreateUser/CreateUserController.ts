import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';
import { ValidationServices } from '../../services/ValidationService';
import { HashEncryption } from '../../services/Encryption';

export class CreateUserController {
  constructor(private CreateUserUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const slugLowerCase: string = name.toLowerCase();
    const slug: string = slugLowerCase.replace(/ /g, '-');

    //novo tete de nome
    const validationServices = new ValidationServices(name, email, password);

    if (validationServices.isValidName(name) === false) {
      return response.status(400).json({
        message:
          'Invalid characters found in the name. Please use only letter and spaces.',
      });
    }

    if (validationServices.isValidEmail(name) === false) {
      return response.status(400).json({
        message: 'Invalid email, please verify how you wrote this email.',
      });
    }
    if (validationServices.isValidPassword(password) === false) {
      return response.status(400).json({
        message:
          'Please write the password using uppercase and lowercase letters, and special characters.',
      });
    }

    const hashencryption = new HashEncryption();

    const hashedPassword = hashencryption.encryptedPassword(password);

    try {
      await this.CreateUserUserUseCase.execute({
        name,
        email,
        password: hashedPassword,
        slug,
      });

      return response.status(201).json('User created successfully.');
    } catch (err) {
      return response.status(500).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
