import Router from 'express'
import { signUp } from '../controllers/authController';
import { validateSignUp } from '../middlewares/signUpValidator';
import validateNumberByCountry from '../middlewares/validatePhoneNumber';
import { checkPasswords, checkValidations } from '../middlewares/furtherSignupValidator';

const router = Router();

router.post('/auth/signup', validateSignUp, checkValidations, validateNumberByCountry, checkPasswords, signUp);

export default router;
