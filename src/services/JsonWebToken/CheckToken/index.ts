import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';
import { CreateUserTokenUseCase } from './CheckUserTokenUseCase';
import { CreateUserTokenController } from './CheckUserTokenController';
import { User } from '../../../entities/User/User';

const postgresUsersRepository = new PostgresUsersRepository();

const createUserTokenUseCase = new CreateUserTokenUseCase(
  postgresUsersRepository,
);
const createUserTokenController = new CreateUserTokenController(
  createUserTokenUseCase,
);

export { createUserTokenUseCase, createUserTokenController };
