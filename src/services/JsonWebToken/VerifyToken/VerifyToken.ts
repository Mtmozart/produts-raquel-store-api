import { GetToken } from '../GetToken/GetToken';
import { IVerifyToken } from './IVerifyTokenDTO';

const jwt = require('jsonwebtoken');
require('dotenv/config');

class VerifyToken {
  public token: IVerifyToken;

  execute = async (req, res, next) => {
    if (!req.headers.authorization)
      return res.status(401).json({ message: 'Denied access!' });

    const getToken = new GetToken();
    const requestToken = await getToken.handle(req);
    const secret = process.env.SECRET;
    const token = requestToken.token;

    if (!token || typeof token !== 'string') {
      return res.status(401).json({ message: 'Incompatible token' });
    }
    try {
      const verified = jwt.verify(token, secret);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).json({ message: err || 'unexpected error' });
    }
  };
}

export { VerifyToken };
