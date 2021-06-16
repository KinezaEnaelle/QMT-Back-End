import Router from "express";
import { verifyToken } from "../middlewares/checkToken";
import { validateNumber } from "../middlewares/phoneNumberValidator";
import {
  validateTransfer,
  checkBalance,
  validateConvertMoney,
} from "../middlewares/transferValidator";
import { checkValidations } from "../middlewares/furtherSignupValidator";
import { transferMoney, convertMoney } from "../controllers/transferController";

const router = Router();

router.get(
  "/wallet/transfer",
  verifyToken,
  validateConvertMoney,
  checkValidations,
  validateNumber,
  checkBalance,
  convertMoney
);

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
