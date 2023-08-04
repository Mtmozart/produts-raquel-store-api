import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserToken } from '../../services/JsonWebToken/CreateUserToken';

export class CreateUserController {
  constructor(private CreateUserUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const slugLowerCase: string = name.toLowerCase();
    const slug: string = slugLowerCase.replace(/ /g, '-');
    const createUserToken = new CreateUserToken();
    try {
      await this.CreateUserUserUseCase.execute({
        name,
        email,
        password,
        slug,
      });
    } catch (err) {
      return response.status(500).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
