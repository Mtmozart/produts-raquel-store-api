import { Request, Response } from 'express';
import { IGetToken } from './IGetToken';
import { TokenVerification } from '../../../utils/Verifications/tokenVerification';

class GetToken {
  public token: IGetToken | null;

  async handle(request: Request): Promise<IGetToken | null> {
    const authHeader = request.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const tokenVerification = new TokenVerification(token);
      const verify = tokenVerification.validateToken();
      verify === true ? (this.token = { token }) : (this.token = null);
    } else {
      this.token = null;
    }

    return this.token;
  }
}

export { GetToken };
