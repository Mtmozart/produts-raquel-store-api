import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';
import { CreateUserTokenController } from './CreateUserTokenController';
import { CreateUserTokenUseCase } from './CreateUserTokenUseCase';

const postgresUsersRepository = new PostgresUsersRepository();

const createUserTokenUseCase = new CreateUserTokenUseCase(
  postgresUsersRepository,
);

const createUserTokenController = new CreateUserTokenController(
  createUserTokenUseCase,
);

export { createUserTokenUseCase, createUserTokenController };
