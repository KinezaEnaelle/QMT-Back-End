import { check } from "express-validator";
import AccountHelper from "../helpers/accountHelper";
import pinHashHelper from "../helpers/pinHashHelper";

const accountName = check("accountName")
  .exists()
  .withMessage("account name required")
  .trim();

const accountNumber = check("accountNumber")
  .exists()
  .withMessage("account number required")
  .trim();

const amount = check("amount").exists().trim().notEmpty();

const userId = check("userId").exists().trim().notEmpty();

const pin = (pinField) =>
  check(pinField, "Pin should be atleast 5 digit long.")
    .exists()
    .withMessage("exist")
    .notEmpty()
    .withMessage("notempty")
    .trim()
    .withMessage("trim")
    .isString()
    .withMessage("integer")
    .matches(/(?=.*[0-9])(?=.{5,}$)/);

const validateAccount = [
  accountName,
  accountNumber,
  userId,
  pin("pin"),
  amount,
];

const validateRecharge = [amount, pin("pin")];

const isAccountOwner = async (req, res, next) => {
  let { number } = req.params;
  number = Number(number);
  const accountExists = await AccountHelper.accountExists(
    "accountNumber",
    number
  );
  if (accountExists) {
    const { id } = req.user;
    if (accountExists.userId === id) {
      req.account = accountExists;
      return next();
    }
    return res.status(401).json({
      status: 401,
      error: "Incorrect account number",
    });
  }
  return res.status(404).json({
    status: 404,
    error: "Incorrect account number",
  });
};

const validatePin = async (req, res, next) => {
  const { pin } = req.body;
  const { pin: hashedPin } = req.account;
  const pinChecks = pinHashHelper.checkPin(pin, hashedPin);
  if (pinChecks) {
    return next();
  }
  return res.status(404).json({
    status: 404,
    error: "Incorrect PIN",
  });
};

const checkAmount = async (req, res, next) => {
  const { account } = req;
  const { amount } = req.body;
  if (account.amount >= amount) {
    return next();
  }
  return res.status(400).json({
    status: 400,
    error: "Insuficient funds",
    availableAmount: account.amount,
  });
};

export {
  validateAccount,
  validateRecharge,
  isAccountOwner,
  checkAmount,
  validatePin,
};
