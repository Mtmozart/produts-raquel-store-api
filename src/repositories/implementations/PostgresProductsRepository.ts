import { IProductsRepository } from '../IProductsRepository';
import { Product } from '../../entities/Product/Product';
import ProductModel from '../../entities/Product/ProductModel';

export class PostgresProductsRepository implements IProductsRepository {
  async save(product: Product): Promise<void> {
    try {
      await ProductModel.create({
        shipment: product.shipment,
        name: product.name,
        entrance: product.entrance,
        sold: product.sold,
        stock: product.stock,
        price: product.price,
        percentage: product.percentage,
        slug: product.slug,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
