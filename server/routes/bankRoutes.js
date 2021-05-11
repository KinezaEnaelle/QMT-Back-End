import Router from "express";
import { addBank } from "../controllers/bankController";
import { validateBank } from "../middlewares/bankValidator";


const router = Router (); 

router.post("/bank/addBank", validateBank, addBank);
export default router;