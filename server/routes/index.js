import Router from 'express';
import authRoutes from './authRoutes';
import bankRoutes from './bankRoutes';
import accountRoutes from './accountRoutes';

const router = Router();
router.use(authRoutes);
router.use(bankRoutes);
router.use(accountRoutes)

export default router;