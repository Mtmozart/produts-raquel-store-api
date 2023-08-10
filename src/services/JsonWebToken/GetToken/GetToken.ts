import { Request, Response } from 'express';
import { IGetToken } from './IGetToken';

class GetToken {
  public token: IGetToken | null;

  async handle(request: Request) {
    const authHeader = request.headers.authorization;
    authHeader
      ? (this.token = { token: authHeader.split(' ')[1] })
      : (this.token = null);
  }
}

export { GetToken };
