import { Request, Response } from 'express';
import { GetToken } from '../GetToken/GetToken';
import { IVerifyTokenIdDTO } from './IVerifyTokenIdDTO';

const jwt = require('jsonwebtoken');
require('dotenv/config');

class VerifyTokenId {
  public token: IVerifyTokenIdDTO;

  execute = async (req, res) => {
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
      return verified;
    } catch (err) {
      res.status(400).json({ message: err || 'unexpected error' });
    }
  };
}

export { VerifyTokenId };
