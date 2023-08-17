import { Request, Response } from 'express';
import { LoginUserUseCase } from './LoginUserUseCase';
import { CreateUserTokenUseCase } from '../../services/JsonWebToken/CreateToken/CreateUserTokenUseCase';

export class LoginUserController {
  constructor(
    private loginUserUserUseCase: LoginUserUseCase,
    private createUserTokenUseCase: CreateUserTokenUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const email = request.body.email;
    const password = request.body.password;

    try {
      const user = this.loginUserUserUseCase.execute({
        email,
        password,
      });
      if (user) {
        const token = await this.createUserTokenUseCase.execute({
          email,
        });
        return response.status(201).json({
          message: 'Login successfully',
          token: token.token,
        });
      }
      return response.status(401).json({
        message: 'Login problem, please, refresh the page',
      });
    } catch (err) {
      return response.status(500).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
