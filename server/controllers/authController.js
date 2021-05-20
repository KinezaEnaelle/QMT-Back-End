import AuthHelper from "../helpers/authHelper";
import { hashPassword } from "../helpers/hasher";
import tokenGenerator from "../helpers/helperToken";
import passwordHashHelper from "../helpers/passwordHashHelper";
import WalletHelper from "../helpers/walletHelper";

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
      if (savedUser.country === "RWANDA") {
        req.body.userId = savedUser.id;
        req.body.balance = 0;
        const { userId, balance } = req.body;
        const wallet = { userId, balance };
        await WalletHelper.saveWallet(wallet);
      } else if (savedUser.country === "BURUNDI") {
        req.body.userId = savedUser.id;
        req.body.balance = 0;
        const { userId, balance } = req.body;
        const wallet = { userId, balance };
        await WalletHelper.saveWallet(wallet);
      } else if (savedUser.country === "UGANDA") {
        req.body.userId = savedUser.id;
        req.body.balance = 0;
        const { userId, balance } = req.body;
        const wallet = { userId, balance };
        await WalletHelper.saveWallet(wallet);
      } else if (savedUser.country === "KENYA") {
        req.body.userId = savedUser.id;
        req.body.balance = 0;
        const { userId, balance } = req.body;
        const wallet = { userId, balance };
        await WalletHelper.saveWallet(wallet);
      } else if (savedUser.country === "TANZANIA") {
        req.body.userId = savedUser.id;
        req.body.balance = 0;
        const { userId, balance } = req.body;
        const wallet = { userId, balance };
        await WalletHelper.saveWallet(wallet);
      }

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
