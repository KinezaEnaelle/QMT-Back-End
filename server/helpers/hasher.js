import bcrypt from 'bcrypt';

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashValue = bcrypt.hashSync(password,salt);
    return {salt,hashValue};
};

export { hashPassword };