import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository';
import { CreateUserTokenUseCase } from '../../services/JsonWebToken/CreateToken/CreateUserTokenUseCase';
import { LoginUserController } from './LoginUserController';
import { LoginUserUseCase } from './LoginUserUseCase';

const postgresUsersRepository = new PostgresUsersRepository();

const createUserTokenUseCase = new CreateUserTokenUseCase(
  postgresUsersRepository,
);

const loginUserUseCase = new LoginUserUseCase(postgresUsersRepository);

const loginUserController = new LoginUserController(
  loginUserUseCase,
  createUserTokenUseCase,
);

export { loginUserController, loginUserUseCase };
