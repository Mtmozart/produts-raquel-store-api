import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserTokenUseCase } from '../../services/JsonWebToken/CreateToken/CreateUserTokenUseCase';

const postgresUsersRepository = new PostgresUsersRepository();

const createUserTokenUseCase = new CreateUserTokenUseCase(
  postgresUsersRepository,
);

const createUserCase = new CreateUserUseCase(postgresUsersRepository);

const createUserController = new CreateUserController(
  createUserCase,
  createUserTokenUseCase,
);

export { createUserCase, createUserController };
