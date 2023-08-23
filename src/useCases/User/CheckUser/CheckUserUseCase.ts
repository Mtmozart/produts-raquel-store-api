import { Request, Response } from 'express';
import { GetToken } from '../../../services/JsonWebToken/GetToken/GetToken';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
const jwt = require('jsonwebtoken');
require('dotenv/config');

class CheckUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(request: Request) {
    const getToken = new GetToken();
    const token = await getToken.handle(request);
    const secret = process.env.SECRET;

    let currentUser;

    if (token !== null && token !== undefined) {
      const decoded = jwt.verify(token.token, secret);
      const id = decoded.userExists.id;
      currentUser = await this.usersRepository.findById(id);
      currentUser.password = undefined;
      return currentUser;
    } else {
      return (currentUser = null);
    }
  }
}

export { CheckUserUseCase };
