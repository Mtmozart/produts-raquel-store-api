const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

class CreateUserToken {
  constructor() {}
  createToken(name: string, id: string) {
    const token = jwt.sign(
      {
        name,
        id,
      },
      secret,
    );

    return {
      token: token,
      userId: id,
    };
  }
  catch(error) {
    throw new Error('Error creating the token');
  }
}

export { CreateUserToken };
