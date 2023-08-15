import { Request, Response } from 'express';
import { CheckUserByIdUseCase } from './CheckUserByIdUseCase';

class CheckUserByIdController {
  constructor(private checkUserByIdUseCase: CheckUserByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { slug } = request.params;

    try {
      const user = await this.checkUserByIdUseCase.execute({ slug });

      if (user === null || user === undefined) {
        response.status(422).json({ message: 'Usuário não encontrado!' });
        return;
      }
      user.password = undefined;
      response.status(200).json({ user });
    } catch (err) {
      response.status(500).json({
        message: err.message || 'Unexpected error.',
      });
      return;
    }
  }
}

export { CheckUserByIdController };
