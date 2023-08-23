import { Request, Response } from 'express';
import { CheckUserByIdUseCase } from './CheckUserByIdUseCase';

class CheckUserByIdController {
  constructor(private checkUserByIdUseCase: CheckUserByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { slug } = request.params;

    try {
      const user = await this.checkUserByIdUseCase.execute({
        slug: slug,
      });

      if (user === null || user === undefined) {
        return response.status(422).json({ message: 'User not found!' });
      }

      user.password = undefined;
      return response.status(200).json({ user });
    } catch (err) {
      return response.status(500).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}

export { CheckUserByIdController };
