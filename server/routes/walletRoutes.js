import Router from "express";
import { addWallet,viewWalletInfo } from "../controllers/walletController";
import { validateWallet } from "../middlewares/walletValidator";
import { verifyToken } from "../middlewares/checkToken";
import { checkValidations } from "../middlewares/furtherSignupValidator";

const router = Router();

router.post(
  "/wallet/recharge",
  verifyToken,
  validateWallet,
  checkValidations,
  addWallet
);
router.get('/wallet/:id', viewWalletInfo);

export default router;
