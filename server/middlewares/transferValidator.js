import { check } from "express-validator";
import WalletHelper from "../helpers/walletHelper";

const amount = check("amount").exists().trim().notEmpty();
const password = (passwordField) =>
  check(
    passwordField,
    "password should be atleast 8 characters long; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, but cannot contain whitespace."
  )
    .exists()
    .withMessage("exist")
    .notEmpty()
    .withMessage("notempty")
    .trim()
    .withMessage("trim")
    .isString()
    .withMessage("string")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.{8,})/)
    .withMessage("reg");

const validateTransfer = [amount, password("password")];

const checkBalance = async (req, res, next) => {
  const { amount } = req.body;
  const { user } = req;
  const wallet = await WalletHelper.walletExists("userId", user.id);
  if (wallet) {
    if (wallet.balance >= amount) {
      return next();
    }
    return res.status(400).json({
      status: 400,
      error: "Insuficient funds",
      availableBalance: wallet.balance,
    });
  }
  return res.status(404).json({
    status: 404,
    error: "wallet not found",
  });
};

export { validateTransfer, checkBalance };
