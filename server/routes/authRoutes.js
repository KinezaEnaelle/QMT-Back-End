import Router from "express";
import { signUp, signIn } from "../controllers/authController";
import { validateSignUp } from "../middlewares/signUpValidator";
import validateNumberByCountry from "../middlewares/validatePhoneNumber";
import { verifyToken } from '../middlewares/checkToken';
import {
  checkPasswords,
  checkValidations,
  validateUniqueEmail,
  validateUniquePhoneNumber
} from "../middlewares/furtherSignupValidator";

const router = Router();

router.post(
  "/auth/signup",
  validateSignUp,
  checkValidations,
  validateNumberByCountry,
  checkPasswords,
  validateUniqueEmail,
  validateUniquePhoneNumber,
  signUp
);
router.post("/auth/signin", signIn);
export default router;
