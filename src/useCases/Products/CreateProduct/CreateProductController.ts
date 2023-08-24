import { Request, Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';
import { uuid } from 'uuidv4';

//verifyToken
import { VerifyTokenId } from '../../../services/JsonWebToken/VerifyTokenId/VerifyTokenId';

class CreateProductController {
  constructor(private createProduct: CreateProductUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      entrance,
      name,
      percentage,
      price,
      shipment,
      sold,
      stock,
      stockValue,
      userId,
    } = request.body;
    const slug = name.toLowerCase() + uuid();
    try {
      const verifyTokenId = new VerifyTokenId();
      const user = await verifyTokenId.execute(request, response);
      const id = user.userExists.id;

      const product = await this.createProduct.execute({
        entrance,
        name,
        percentage,
        price,
        shipment,
        slug,
        sold,
        stock,
        stockValue,
        userId: id,
      });

      return;
    } catch (error) {}
    return;
  }
}

export { CreateProductController };
