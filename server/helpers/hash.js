import bcrypt from "bcrypt";

const hashPin = (pin) => {
  const salt = bcrypt.genSaltSync(10);
  const hashMerit = bcrypt.hashSync(pin, salt);
  return { salt, hashMerit };
};

export { hashPin };
