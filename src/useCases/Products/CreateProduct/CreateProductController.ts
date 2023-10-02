import { Request, Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';
//User
import { CheckUserByIdController } from '../../User/CheckUserById/CheckUserByIdController';
import { uuid } from 'uuidv4';
//Utils
import { Conversion } from '../../../utils/Conversions/Conversions';
//verifyToken
import { VerifyTokenId } from '../../../services/JsonWebToken/VerifyTokenId/VerifyTokenId';

class CreateProductController extends Conversion {
  constructor(private createProduct: CreateProductUseCase) {
    super();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { entrance, name, percentage, price, shipment, sold, stock } =
      request.body;
    const { slug } = request.params;
    const slugProduct = name.toLowerCase().replace(/\s+/g, '-') + '-' + uuid();

    //this is conversions
    const percentageValue = this.numberInter({ value: percentage });
    const entranceValue = this.numberInter({ value: entrance });
    const priceValue = this.realNumbers({ value: price });
    const shipmentValue = this.numberInter({ value: shipment });
    const soldValue = this.numberInter({ value: sold });
    const stockValue = this.numberInter({ value: stock });

    try {
      const verifyTokenId = new VerifyTokenId();
      const user = await verifyTokenId.execute(request, response);
      const id = user.userExists.id;
      console.log('Esse é o id', id);

      const product = await this.createProduct.execute({
        entrance: entranceValue,
        name,
        percentage: percentageValue,
        price: priceValue,
        shipment: shipmentValue,
        slug: slugProduct,
        sold: soldValue,
        stock: stockValue,
        userId: id,
      });

      return response.status(200).json({
        message: 'Produto criado com sucesso',
        product: product,
      });
    } catch (err) {
      return response.status(500).json({
        message: err || 'Unexpected error',
      });
    }
  }
}

export { CreateProductController };
