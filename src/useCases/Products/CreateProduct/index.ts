import { PostgresProductsRepository } from '../../../repositories/implementations/PostgresProductsRepository';
import { CreateProductUseCase } from './CreateProductUseCase';
import { CreateProductController } from './CreateProductController';

const postgresProductsRepository = new PostgresProductsRepository();
const createProductUseCase = new CreateProductUseCase(
  postgresProductsRepository,
);

const createProductController = new CreateProductController(
  createProductUseCase,
);

export { createProductController };
