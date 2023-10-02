import { Request, Response } from 'express';
import { CheckProductByIdUseCase } from './CheckProductByIdUseCase';
class CheckProductByIdController {
  constructor(private checkProductByIdUseCase: CheckProductByIdUseCase) {}
  async handle(request: Request, response: Response) {
    const { slug } = request.params;

    try {
      const product = await this.checkProductByIdUseCase.execute({
        slug: slug,
      });

      if (product === null || product === undefined) {
        return response.status(422).json({ message: 'User not found!' });
      }

      return response.status(200).json({ product });
    } catch (err) {
      return response.status(500).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}

export { CheckProductByIdController };
