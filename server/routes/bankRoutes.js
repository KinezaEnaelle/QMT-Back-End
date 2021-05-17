import Router from "express";
import { addBank } from "../controllers/bankController";
import { validateBank } from "../middlewares/bankValidator";
import { verifyToken } from "../middlewares/checkToken";
import { checkValidations } from "../middlewares/furtherSignupValidator";

const router = Router();

router.post(
  "/bank/addBank",
  verifyToken,
  validateBank,
  checkValidations,
  addBank
);
export default router;
