import { Product } from '../../../entities/Product/Product';
import { IProductsRepository } from '../../../repositories/IProductsRepository';
import { ValidationServices } from '../../../services/ValidationService';
import { ICreateProductDTO } from './ICreateProductDTO';

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
        stockValue: data.stockValue,
        userId: data.userId,
      });

      await this.productRepository.save(product);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { CreateProductUseCase };
