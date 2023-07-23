import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const postgresUsersRepository = new PostgresUsersRepository();

const createUserCase = new CreateUserUseCase(postgresUsersRepository);

const createUserController = new CreateUserController(createUserCase);

export { createUserCase, createUserController };
