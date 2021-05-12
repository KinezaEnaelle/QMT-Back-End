import { check } from "express-validator";

const accountName = check("accountName")
  .exists()
  .withMessage("account name required")
  .trim()
  .isEmail()
  .normalizeEmail();

const accountNumber = check("accountNumber")
  .exists()
  .withMessage("account number required")
  .trim()
  .isEmail()
  .normalizeEmail();

const amount = check("amount").exists().trim().isEmail().normalizeEmail();

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
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.{8,})/);

const validateAccount = [
  accountName,
  accountNumber,
  userId,
  pin("pin"),
  amount,
];

export { validateAccount };
