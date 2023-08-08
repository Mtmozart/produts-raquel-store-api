import { Request, Response } from 'express';
import { CreateUserTokenUseCase } from './CreateUserTokenUseCase';

class CreateUserTokenController {
  constructor(private createUserTokenUseCase: CreateUserTokenUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const userId = request.userId;

    try {
      const token = await this.createUserTokenUseCase.execute({
        name,
        email,
      });

      return response.status(200).json(token);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export { CreateUserTokenController };
