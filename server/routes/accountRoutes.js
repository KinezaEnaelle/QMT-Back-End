import Router from "express";
import { addAccount } from "../controllers/accountController";
import {
  validateAccount,
  validateRecharge,
  isAccountOwner,
  checkAmount,
  validatePin,
} from "../middlewares/accountValidator";
import { verifyToken } from "../middlewares/checkToken";
import { checkValidations } from "../middlewares/furtherSignupValidator";

const router = Router();

router.post(
  "/account/addAccount",
  verifyToken,
  validateAccount,
  checkValidations,
  addAccount
);
router.put(
  "/account/:number",
  verifyToken,
  validateRecharge,
  checkValidations,
  isAccountOwner,
  validatePin,
  checkAmount,
  addAccount
);

export default router;
