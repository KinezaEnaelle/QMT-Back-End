import { check } from "express-validator";
import WalletHelper from '../helpers/walletHelper';

const userId = check("userId").exists().trim().notEmpty();

const balance = check("balance").exists().trim().notEmpty();

const validateWallet = [userId, balance];

const checkFunds = async (req, res, next) => {
    const { id } = req.user;
    const { amount } = req.body;
    const wallet = await WalletHelper.walletExists('userId', id);
    if(wallet.balance >= amount) {
        req.wallet = wallet;
        return next();
    }
    return res.status(400).json({
        status: 400,
        error: 'Insuficient funds'
    });
};

export { validateWallet, checkFunds };
