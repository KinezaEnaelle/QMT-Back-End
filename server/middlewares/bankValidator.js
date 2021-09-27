import { check } from "express-validator";

const name = check("name").exists().withMessage("name required").trim();

const location = check("location", "the location field is required")
  .exists()
  .notEmpty()
  .trim()
  .matches(new RegExp("^burundi$|^rwanda$|^kenya$|^uganda$|^tanzania$", "i"))
  .withMessage("field sould either be burundi,rwanda,kenya,uganda or tanzania");

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

const accountNumber = check("accountNumber")
  .exists()
  .withMessage("account number required")
  .matches(/^[0-9]+$/)
  .trim();

const validateBank = [name, location];
const validateAccountConfirmation = [accountNumber, pin('pin')];

export { validateBank, validateAccountConfirmation };
