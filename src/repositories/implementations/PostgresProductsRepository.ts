import { IProductsRepository } from '../IProductsRepository';
import { Product } from '../../entities/Product/Product';
import ProductModel from '../../entities/Product/ProductModel';

export class PostgresProductsRepository implements IProductsRepository {
  async save(product: Product): Promise<void> {
    await ProductModel.create({
      shipment: product.shipment,
      name: product.name,
      entrance: product.entrance,
      sold: product.sold,
      stock: product.stock,
      price: product.price,
      percentage: product.percentage,
      slug: product.slug,
      userId: product.userId,
    });
  }
  async findProductById(slug: string): Promise<Product | null> {
    const product = await ProductModel.findOne({
      where: { slug: slug },
    });

    return product;
  }

  async findAllByUser(userId: string): Promise<Product[] | null> {
    const products = await ProductModel.findAll({ where: { userId: userId } });

    return products;
  }
}
