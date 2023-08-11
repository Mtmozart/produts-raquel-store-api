import { Request, Response } from 'express';
import { CheckUserUseCase } from './CheckUserUseCase';

class CheckUserController {
  constructor(private checkUserUseCase: CheckUserUseCase) {}

  async handle(request: Request, response: Response) {
    let currentUser = await this.checkUserUseCase.execute(request);

    try {
      if (currentUser !== null) {
        return response.status(201).json({
          message: 'User checked',
          user: currentUser,
        });
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
