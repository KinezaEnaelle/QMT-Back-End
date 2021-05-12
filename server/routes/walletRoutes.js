import Router from "express";
import { addWallet } from "../controllers/walletController";
import { validateWallet } from "../middlewares/walletValidator";

const router = Router (); 

router.post("/wallet/addWallet", validateWallet, addWallet);
export default router; 