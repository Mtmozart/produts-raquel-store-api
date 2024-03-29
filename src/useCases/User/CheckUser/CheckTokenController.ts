import { Request, Response } from 'express';
import { CheckUserUseCase } from './CheckUserUseCase';

class CheckUserController {
  constructor(private checkUserUseCase: CheckUserUseCase) {}

  async handle(request: Request, response: Response) {
    let currentUser = await this.checkUserUseCase.execute(request);

    if (!currentUser) {
      return response.status(422).json({
        message: 'The provided authentication token is invalid or expired.',
      });
    }

    try {
      if (currentUser !== null && currentUser !== undefined) {
        return response.status(200).send(currentUser);
      }
      return response.status(403).json({
        message: 'Denied access',
      });
    } catch (err) {
      return response.status(500).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}

export { CheckUserController };
