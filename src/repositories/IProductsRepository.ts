import { Product } from '../entities/Product/Product';

export interface IProductsRepository {
  save(product: Product): Promise<void>;
}
