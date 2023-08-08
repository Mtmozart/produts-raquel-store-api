import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';
import { CreateUserTokenUseCase } from './CreateUserTokenUseCase';
import { CreateUserTokenController } from './CreateUserTokenController';

const postgresUsersRepository = new PostgresUsersRepository();

const createUserTokenUseCase = new CreateUserTokenUseCase(
  postgresUsersRepository,
);
const createUserTokenController = new CreateUserTokenController(
  createUserTokenUseCase,
);

export { createUserTokenUseCase, createUserTokenController };
