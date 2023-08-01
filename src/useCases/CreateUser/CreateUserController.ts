import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

import EmailValidator from '../../utils/EmailVerifications/verifyEmail';

export class CreateUserController {
  constructor(private CreateUserUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const slugLowerCase: string = name.toLowerCase();
    const slug: string = slugLowerCase.replace(/ /g, '-');

    const emailValidator = new EmailValidator(email);
    if (
      !emailValidator.isValidFormat() ||
      !emailValidator.isValidDomain() ||
      !emailValidator.isValidProvider() ||
      !emailValidator.isSafeFromHtmlInjection()
    ) {
      return response.status(400).json({
        message: 'Invalid email, please verify how you wrote the email.',
      });
    }

    try {
      await this.CreateUserUserUseCase.execute({
        name,
        email,
        password,
        slug,
      });

      return response.status(201).json('User created successfully.');
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
