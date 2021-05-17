import Router from "express";
import { addWallet } from "../controllers/walletController";
import { validateWallet } from "../middlewares/walletValidator";
import { verifyToken } from "../middlewares/checkToken";
import { checkValidations } from "../middlewares/furtherSignupValidator";

const router = Router();

router.post(
  "/wallet/addWallet",
  verifyToken,
  validateWallet,
  checkValidations,
  addWallet
);

export default router;
