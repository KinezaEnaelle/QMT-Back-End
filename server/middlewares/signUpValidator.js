import { check } from "express-validator";

const name = (fieldName) =>
  check(
    fieldName,
    `${fieldName} is required, and should atleast be 3 characters long`
  )
    .exists()
    .not()
    .isEmpty()
    .isString()
    .isLength({ min: 3 });

    const email = check('email', 'invalid email address')
    .exists().withMessage('email required')
    .trim()
    .isEmail()
    .normalizeEmail();

    const country = check('country', 'the country field is required')
    .exists()
    .notEmpty()
    .trim()
    .matches(new RegExp('^burundi$|^rwanda$|^kenya$|^uganda$|^tanzania$', 'i'))
    .withMessage('field sould either be burundi,rwanda,kenya,uganda or tanzania');

    const password = (passwordFieldName) => check(passwordFieldName, 'password should be atleast 8 characters long; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, but cannot contain whitespace.')
    .exists().withMessage('exist')
    .notEmpty().withMessage('notempty')
    .trim().withMessage('trim')
    .isString().withMessage('string')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.{8,})/).withMessage('reg');
    
const validateSignUp = [
    name('fname'),
    name('lname'),
    email,
    country,
    password('password'),
    password('confirmPassword')
]

export { validateSignUp }
