import { Request, Response } from 'express';
import { CreateUserTokenUseCase } from './CreateUserTokenUseCase';

class CreateUserTokenController {
  constructor(private createUserTokenUseCase: CreateUserTokenUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    try {
      const data = await this.createUserTokenUseCase.execute({
        email,
      });
      return response.status(200).json(data);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export { CreateUserTokenController };
