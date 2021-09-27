import Router from "express";
import { addBank, validateAccount } from "../controllers/bankController";
import {
  validateBank,
  validateAccountConfirmation,
} from "../middlewares/bankValidator";
import { verifyToken } from "../middlewares/checkToken";
import { checkValidations, isIdSafeInteger } from "../middlewares/furtherSignupValidator";

const router = Router();

router.post(
  "/bank/addBank",
  verifyToken,
  validateBank,
  checkValidations,
  addBank
);

router.put(
  "/bank/:id/confirm-account",
  verifyToken,
  validateAccountConfirmation,
  checkValidations,
  isIdSafeInteger,
  validateAccount
);

export default router;
