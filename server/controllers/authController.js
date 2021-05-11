import AuthHelper from "../helpers/authHelper";
import { hashPassword } from "../helpers/hasher";
import tokenGenerator from "../helpers/helperToken";
import passwordHashHelper from "../helpers/passwordHashHelper";

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
      password: hashValue,
      country,
      phoneNumber,
      salt,
      hashValue,
      role: "USER",
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
      error: "server error",
    });
  }
};

const signIn = async (req, res) => {
  const emailExists = await AuthHelper.userExists("email", req.body.email);
  if (emailExists) {
    const passwordExist = await passwordHashHelper.checkPassword(
      req.body.password,
      emailExists.password
    );
    if (passwordExist) {
      return res.status(200).json({
        status: 200,
        message: "Successfully loged in",
        data: {
          token: await tokenGenerator(emailExists.role, emailExists.id),
        },
      });
    }
  }
  return res.status(401).json({
    status: 401,
    error: "Email or Password is incorrect",
  });
};
export { signUp, signIn };
