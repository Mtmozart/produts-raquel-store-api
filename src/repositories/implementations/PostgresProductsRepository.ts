import { IProductsRepository } from '../IProductsRepository';
import { Product } from '../../entities/Product/Product';
import ProductModel from '../../entities/Product/ProductModel';

export class PostgresProductsRepository implements IProductsRepository {
  async save(product: Product): Promise<void> {
    await ProductModel.create({
      shipment: product.shipment,
      name: product.name,
      entrace: product.entrance,
      sold: product.sold,
      stock: product.stock,
      price: product.price,
      stockValue: product.stockValue,
      percentage: product.percentage,
      slug: product.slug,
    });
  }
}
