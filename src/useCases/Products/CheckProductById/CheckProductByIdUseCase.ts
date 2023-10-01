import { CheckProductByIdDTO } from './CheckProductByIdDTO';
import { IProductsRepository } from '../../../repositories/IProductsRepository';

class CheckProductByIdUseCase {
  constructor(private productRepository: IProductsRepository) {}

  async execute(data: CheckProductByIdDTO) {
    const product = await this.productRepository.findProductById(data.slug);
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
}

export { CheckProductByIdUseCase };
