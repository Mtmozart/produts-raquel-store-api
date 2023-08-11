import { Request, Response } from 'express';
import { IGetToken } from './IGetToken';

class GetToken {
  public token: IGetToken | null;

  async handle(request: Request): Promise<IGetToken | null> {
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      this.token = { token };
    } else {
      this.token = null;
    }
    console.log(this.token);
    return this.token;
  }
}

export { GetToken };
