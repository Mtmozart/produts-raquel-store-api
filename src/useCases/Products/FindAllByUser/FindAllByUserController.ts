import { Request, Response } from 'express';
import { FindAllByUserUseCase } from './FindAllByUserUseCase';

class FindAllByUserController {
  constructor(private findAllByUserUseCase: FindAllByUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { slug } = request.params;

    try {
      const products = await this.findAllByUserUseCase.execute({
        userId: slug,
      });
    } catch (err) {
      return response.status(500).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}

export { FindAllByUserController };
