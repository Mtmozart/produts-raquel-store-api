import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserTokenDTO } from './ICreateUserTokenDTO';
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

class CreateUserTokenUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserTokenDTO) {
    const userExists = await this.usersRepository.findByEmailAndName(
      data.name,
      data.email,
    );
    if (!userExists) {
      throw new Error(
        'We have a problem with creating tokens. Please return after.',
      );
    }

    const token = jwt.sign(
      {
        name: data.name,
        id: userExists.getId,
      },
      secret,
    );
    try {
      return {
        token: token,
        userId: userExists.getId,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };
    } catch (error) {
      throw new Error(
        'There is an error with creating the token. Please talk to the support',
      );
    }
  }
}

export { CreateUserTokenUseCase };
