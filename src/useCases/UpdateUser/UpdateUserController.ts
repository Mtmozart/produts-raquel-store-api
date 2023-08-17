import { UpdateUserUseCase } from './UpdateUserUseCase';
import { Request, Response } from 'express';
import { uuid } from 'uuidv4';
import { CheckUserByIdUseCase } from '../CheckUserById/CheckUserByIdUseCase';

class UpdateUserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase,
    private checkUserByIdUseCase: CheckUserByIdUseCase,
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const { slug } = request.params;

    try {
      const userParam = await this.checkUserByIdUseCase.execute({
        slug,
      });

      const user = await this.updateUserUseCase.execute({
        id: userParam.id,
        email,
        name,
        password,
        slug: slug,
      });
      return response.status(201).json({
        message: 'User updated successfully',
        user: user,
      });
    } catch (err) {
      return response.status(501).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}

export { UpdateUserController };
