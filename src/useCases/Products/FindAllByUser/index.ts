import { PostgresProductsRepository } from '../../../repositories/implementations/PostgresProductsRepository';
import { FindAllByUserUseCase } from './FindAllByUserUseCase';
import { FindAllByUserController } from './FindAllByUserController';

const postgresProductsRepository = new PostgresProductsRepository();
const findAllByUserUseCase = new FindAllByUserUseCase(
  postgresProductsRepository,
);
const findAllByUserController = new FindAllByUserController(
  findAllByUserUseCase,
);

export { findAllByUserController };
