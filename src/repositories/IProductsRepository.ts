import { Product } from '../entities/Product/Product';

export interface IProductsRepository {
  save(product: Product): Promise<void>;
  findProductById(slug: string): Promise<Product | null>;
  findAllByUser(userId): Promise<Product[] | null>;
}
