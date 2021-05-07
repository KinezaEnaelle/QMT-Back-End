import Router from 'express'
import AuthController from '../controllers/authController'

const router = Router();

router.post('/auth/signup', AuthController.signUp);
export default router;