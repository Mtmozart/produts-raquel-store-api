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
    const slugLowerCase: string = name.toLowerCase();
    const newSlug: string = slugLowerCase.replace(/ /g, '-') + uuid();
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
        slug: newSlug,
      });
      return response.status(201).json({
        message: 'User updated successfully',
        user: user,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export { UpdateUserController };
