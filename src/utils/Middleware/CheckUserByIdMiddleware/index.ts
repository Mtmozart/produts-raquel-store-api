import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';

import { VerifyTokenIdM } from './VerifyTokenIdM';
const postgresUsersRepository = new PostgresUsersRepository();
const verifyTokenIdM = new VerifyTokenIdM(postgresUsersRepository);

export { verifyTokenIdM };
