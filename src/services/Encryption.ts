const bcrypt = require('bcryptjs');

class HashEncryption {
  encryptedPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }
}

export { HashEncryption };
