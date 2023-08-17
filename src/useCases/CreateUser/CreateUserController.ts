import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserTokenUseCase } from '../../services/JsonWebToken/CreateToken/CreateUserTokenUseCase';
import { uuid } from 'uuidv4';

export class CreateUserController {
  constructor(
    private CreateUserUserUseCase: CreateUserUseCase,
    private createUserTokenUseCase: CreateUserTokenUseCase,
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const slug: string = uuid();

    try {
      const user = await this.CreateUserUserUseCase.execute({
        name,
        email,
        password,
        slug,
      });

      const token = await this.createUserTokenUseCase.execute({
        email,
      });

      return response.status(201).json({
        message: 'User created successfully',
        user: user,
        token: token,
      });
    } catch (err) {
      return response.status(500).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
