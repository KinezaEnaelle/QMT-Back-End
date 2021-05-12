import { check } from "express-validator";

const userId = check("userId").exists().trim().notEmpty();

const balance = check("balance").exists().trim().notEmpty();

const validateWallet = [
    userId,
    balance,
];

export { validateWallet };