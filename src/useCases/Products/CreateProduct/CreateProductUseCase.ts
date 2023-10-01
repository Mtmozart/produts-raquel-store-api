import { Product } from '../../../entities/Product/Product';
import { IProductsRepository } from '../../../repositories/IProductsRepository';
import { ICreateProductDTO } from './ICreateProductDTO';
//service
import { ValidationServices } from '../../../services/ValidationService';

class CreateProductUseCase {
  constructor(private productRepository: IProductsRepository) {}

  async execute(data: ICreateProductDTO) {
    const validation = new ValidationServices(data.name);

    if (validation.isValidName(data.name) === false) {
      throw new Error(
        'Invalid characters found in the name. Please use only letter and spaces.',
      );
    }

    try {
      const product = new Product({
        entrance: data.entrance,
        name: data.name,
        percentage: data.percentage,
        price: data.price,
        shipment: data.shipment,
        slug: data.slug,
        sold: data.sold,
        stock: data.stock,
        userId: data.userId,
      });

      await this.productRepository.save(product);
    } catch (err) {
      throw new Error(err);
    }
  }
}
export { CreateProductUseCase };
