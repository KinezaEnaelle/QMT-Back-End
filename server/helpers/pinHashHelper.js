import bcrypt from "bcrypt";

class Hash {
  static hashPin(pin) {
    return bcrypt.hashSync(pin, 5);
  }

  static checkPin(plainPin, hashedPin) {
    return bcrypt.compareSync(plainPin, hashedPin);
  }
}

export default Hash;
