// utils/checkUserByIdMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { CheckUserByIdUseCase } from '../../useCases/CheckUserById/CheckUserByIdUseCase';
import { VerifyTokenId } from '../../services/JsonWebToken/VerifyTokenId/VerifyTokenId';

export const checkUserByIdMiddleware =
  (checkUserByIdUseCase: CheckUserByIdUseCase) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const { slug } = request.params;

    try {
      const verifyTokenId = new VerifyTokenId();
      const userToken = await verifyTokenId.execute(request, response);
      const tokenId = userToken.userExists.id;

      const user = await checkUserByIdUseCase.execute({
        slug: slug,
      });

      if (user === null || user === undefined) {
        throw new Error('User not found');
      }
      if (user.id !== tokenId) {
        throw new Error('User not authorized');
      }

      user.password = undefined;
      request.user = user;
      next();
    } catch (err) {
      return response.status(500).json({
        message: err.message || 'Unexpected error.',
      });
    }
  };
