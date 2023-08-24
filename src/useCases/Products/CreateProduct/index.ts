import { Product } from '../../../entities/Product/Product';
import { PostgresProductsRepository } from '../../../repositories/implementations/PostgresProductsRepository';
import { CreateProductUseCase } from './CreateProductUseCase';

const postgresProductsRepository = new PostgresProductsRepository();
const createProductUseCase = new CreateProductUseCase(
  postgresProductsRepository,
);
