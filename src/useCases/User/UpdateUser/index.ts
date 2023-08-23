import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { UpdateUserController } from './UpdateUserController';
import { CheckUserByIdUseCase } from '../CheckUserById/CheckUserByIdUseCase';

const postgresUsersRepository = new PostgresUsersRepository();

const updateUserUseCase = new UpdateUserUseCase(postgresUsersRepository);

const checkUserByIdUseCase = new CheckUserByIdUseCase(postgresUsersRepository);

const updateUserController = new UpdateUserController(
  updateUserUseCase,
  checkUserByIdUseCase,
);

export { updateUserUseCase, updateUserController };
