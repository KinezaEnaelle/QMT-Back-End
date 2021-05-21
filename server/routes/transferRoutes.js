import Router from "express";
import { verifyToken } from "../middlewares/checkToken";
import { validateNumber } from "../middlewares/phoneNumberValidator";
import {
  validateTransfer,
  checkBalance,
} from "../middlewares/transferValidator";
import { checkValidations } from "../middlewares/furtherSignupValidator";
import { transferMoney } from "../controllers/transferController";

const router = Router();

router.put(
  "/wallet/transfer",
  verifyToken,
  validateTransfer,
  checkValidations,
  validateNumber,
  checkBalance,
  transferMoney
);

export default router;
