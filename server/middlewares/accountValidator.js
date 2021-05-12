import { check } from "express-validator";

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

export { validateAccount };
