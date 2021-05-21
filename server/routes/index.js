import Router from "express";
import authRoutes from "./authRoutes";
import bankRoutes from "./bankRoutes";
import accountRoutes from "./accountRoutes";
import walletRoutes from "./walletRoutes";
import transferRoutes from './transferRoutes';

const router = Router();
router.use(authRoutes);
router.use(bankRoutes);
router.use(accountRoutes);
router.use(walletRoutes);
router.use(transferRoutes);

export default router;
