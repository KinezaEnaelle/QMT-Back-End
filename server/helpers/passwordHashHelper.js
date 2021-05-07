import bcrypt from 'bcrypt';

class Hasher {
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

export default Hasher;