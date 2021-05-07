import { validationResult } from 'express-validator';

const checkPasswords = (req, res, next) => {
    const { password, confirmPassword } = req.body;
    if(password === confirmPassword) {
        return next();
    }
    return res.status(400).json({
        status: 400,
        error: 'confirm password should match the passowrd'
    });
};

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            errors
        });
    }
    req.body.country = req.body.country.toUpperCase();
    return next();
};

export {
    checkPasswords,
    checkValidations
}
