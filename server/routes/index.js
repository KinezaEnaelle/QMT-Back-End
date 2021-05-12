import Router from 'express';
import authRoutes from './authRoutes';
import bankRoutes from './bankRoutes';

const router = Router();
router.use(authRoutes);
router.use(bankRoutes)

export default router;