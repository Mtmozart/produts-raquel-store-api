import { PostgresProductsRepository } from '../../../repositories/implementations/PostgresProductsRepository';
import { CheckProductByIdUseCase } from './CheckProductByIdUseCase';
import { CheckProductByIdController } from './CheckProductByIdController';

const postgresProductsRepository = new PostgresProductsRepository();

const checkProductByIdUseCase = new CheckProductByIdUseCase(
  postgresProductsRepository,
);

const checkProductByIdController = new CheckProductByIdController(
  checkProductByIdUseCase,
);

export { checkProductByIdController };
