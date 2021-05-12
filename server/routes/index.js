import Router from "express";
import authRoutes from "./authRoutes";
import bankRoutes from "./bankRoutes";
import accountRoutes from "./accountRoutes";
import walletRoutes from "./walletRoutes";

const router = Router();
router.use(authRoutes);
router.use(bankRoutes);
router.use(accountRoutes);
router.use(walletRoutes);

export default router;
