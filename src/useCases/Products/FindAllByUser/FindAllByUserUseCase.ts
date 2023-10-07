import { IProductsRepository } from '../../../repositories/IProductsRepository';
import { FindAllByUserDTO } from './FindAllByUserDTO';
class FindAllByUserUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(data: FindAllByUserDTO) {}
}

export { FindAllByUserUseCase };
