import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository';
import { CheckUserUseCase } from './CheckUserUseCase';
import { CheckUserController } from './CheckUserController';

const postgresUsersRepository = new PostgresUsersRepository();

const checkUserUseCase = new CheckUserUseCase(postgresUsersRepository);

const checkUserController = new CheckUserController(checkUserUseCase);

export { checkUserUseCase, checkUserController };
