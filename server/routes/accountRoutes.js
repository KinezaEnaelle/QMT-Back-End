import Router from "express";
import { addAccount } from "../controllers/accountController";
import { rechargeBalance, deposit } from "../controllers/rechargeController";
import {
  validateAccount,
  validateRecharge,
  isAccountOwner,
  checkAmount,
  validatePin,
} from "../middlewares/accountValidator";
import { verifyToken } from "../middlewares/checkToken";
import { checkValidations } from "../middlewares/furtherSignupValidator";
import { checkFunds } from '../middlewares/walletValidator';

const router = Router();

router.post(
  "/account/addAccount",
  verifyToken,
  validateAccount,
  checkValidations,
  addAccount
);
router.put(
  "/account/:number/withdraw",
  verifyToken,
  validateRecharge,
  checkValidations,
  isAccountOwner,
  validatePin,
  checkAmount,
  rechargeBalance
);

router.put(
  "/account/:number/deposit",
  verifyToken,
  validateRecharge,
  checkValidations,
  isAccountOwner,
  validatePin,
  checkFunds,
  deposit
);

export default router;
