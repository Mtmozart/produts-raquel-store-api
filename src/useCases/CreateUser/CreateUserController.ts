import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';
import { NameVerifications } from '../../utils/Verifications/nameVerification';
import EmailVerifications from '../../utils/Verifications/emailVerification';

export class CreateUserController {
  constructor(private CreateUserUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const slugLowerCase: string = name.toLowerCase();
    const slug: string = slugLowerCase.replace(/ /g, '-');

    const emailVerifications = new EmailVerifications(email);
    if (
      !emailVerifications.isValidFormat() ||
      !emailVerifications.isValidDomain() ||
      !emailVerifications.isValidProvider() ||
      !emailVerifications.isSafeFromHtmlInjection()
    ) {
      return response.status(400).json({
        message: 'Invalid email, please verify how you wrote this email.',
      });
    }
    const nameVerifications = new NameVerifications(name);
    if (
      !nameVerifications.isValidFormat() ||
      !nameVerifications.isSafeFromHtmlInjection()
    ) {
      return response.status(400).json({
        message:
          'Invalid characters found in the name. Please use only letter and spaces',
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
