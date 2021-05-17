import { validationResult } from "express-validator";
import AuthHelper from "../helpers/authHelper";

const checkPasswords = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password === confirmPassword) {
    return next();
  }
  return res.status(400).json({
    status: 400,
    error: "confirm password should match the passowrd",
  });
};

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors,
    });
  }
  return next();
};

const validateUniqueEmail = async (req, res, next) => {
  const { email, phoneNumber } = req.body;
  try {
    const exists = await AuthHelper.userExists("email", email);
    if (exists) {
      return res.status(400).json({
        status: 400,
        error: "provided email already in use",
      });
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      error: "server error",
    });
  }
};

const validateUniquePhoneNumber = async (req, res, next) => {
  const { phoneNumber } = req.body;
  try {
    const exists = await AuthHelper.userExists("phoneNumber", phoneNumber);
    if (exists) {
      return res.status(400).json({
        status: 400,
        error: "provided phone number is already in use",
      });
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      error: "server error",
    });
  }
};

export {
  checkPasswords,
  checkValidations,
  validateUniqueEmail,
  validateUniquePhoneNumber,
};
