import Router from "express";
import { addAccount } from "../controllers/accountController";
import { validateAccount} from "../middlewares/accountValidator";

const router = Router (); 

router.post("/account/addAccount", validateAccount, addAccount);
export default router; 