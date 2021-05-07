import Router from "express";
import { signUp, signIn } from "../controllers/authController";
import { validateSignUp } from "../middlewares/signUpValidator";
import validateNumberByCountry from "../middlewares/validatePhoneNumber";
import {
  checkPasswords,
  checkValidations,
} from "../middlewares/furtherSignupValidator";

const router = Router();

router.post(
  "/auth/signup",
  validateSignUp,
  checkValidations,
  validateNumberByCountry,
  checkPasswords,
  signUp
);
router.post("/auth/signin", signIn);
export default router;
