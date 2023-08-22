import { VerifyTokenId } from '../../../services/JsonWebToken/VerifyTokenId/VerifyTokenId';
import { IVerifyTokenIdMDTO } from './IVerifyTokenIdDTO';
import { IUsersRepository } from '../../../repositories/IUsersRepository';

const jwt = require('jsonwebtoken');
require('dotenv/config');

class VerifyTokenIdM {
  public slug: IVerifyTokenIdMDTO;
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (req, res, next) => {
    try {
      const verifyTokenId = new VerifyTokenId();
      const userToken = await verifyTokenId.execute(req, res);
      const tokenId = userToken.userExists.id;
      const slug = req.params.slug;

      const userSlug = await this.usersRepository.findBySlug(slug);
      const slugId = userSlug.id;

      if (slugId !== tokenId) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
  };
}

export { VerifyTokenIdM };
