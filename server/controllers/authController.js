import AuthHelper from "../helpers/authHelper";
import { hashPassword } from "../helpers/hasher";

const signUp = async (req, res) => {
  try {
    const { fname, lname, email, password, country, phoneNumber } = req.body;
    const emailExists = await AuthHelper.userExists("email", email);
    if (emailExists) {
      return res.status(409).json({
        status: 409,
        error: "This user already exists, use a....",
      });
    }
    const { salt, hashValue } = hashPassword(password);
    const user = {
      fname,
      lname,
      email,
      password,
      country,
      phoneNumber,
      salt,
      hashValue,
    };
    const savedUser = await AuthHelper.saveUser(user);
    if (savedUser) {
      return res.status(201).json({
        status: 201,
        message: " Successfully created",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      error: 'server error'
    });
  }
};
export { signUp };
