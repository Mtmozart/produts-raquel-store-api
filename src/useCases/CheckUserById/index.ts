import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository';
import { CheckUserByIdUseCase } from './CheckUserByIdUseCase';
import { CheckUserByIdController } from './CheckUserByIdController';

const postgresUsersRepository = new PostgresUsersRepository();

const checkUserByIdUseCase = new CheckUserByIdUseCase(postgresUsersRepository);

const checkUserByIdController = new CheckUserByIdController(
  checkUserByIdUseCase,
);

export { checkUserByIdUseCase, checkUserByIdController };
