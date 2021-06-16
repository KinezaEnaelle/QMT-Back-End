import AccountHelper from "../helpers/accountHelper";
import WalletHelper from "../helpers/walletHelper";
import TransactionHelper from '../helpers/transactionHelper';

const rechargeBalance = async (req, res) => {
  const { account } = req;
  const { amount } = req.body;
  const accountBalance = account.amount - Number(amount);
  const wallet = await WalletHelper.walletExists("userId", account.userId);
  const updatedBalance = await AccountHelper.updateAmount(
    accountBalance,
    account.accountNumber
  );
  if (updatedBalance && updatedBalance[0] === 1) {
    const walletBalance = wallet.balance + Number(amount);
    const updatedWallet = await WalletHelper.updateWalletAmount(
      walletBalance,
      wallet.userId
    );
    if (updatedWallet && updatedWallet[0] === 1) {
      const toDate = new Date();
      const newTransaction = {
        transactionId: `${toDate.getTime()}_${account.userId}_${account.userId}`,
        senderId: account.userId,
        receiverId: account.userId,
        amountSent: amount,
        amountReceived: amount,
        exchangeRate: 1,
        transactionType: 'RECHARGE',
        createdAt: toDate,
        updatedAt: toDate,
      };
      const savedTransaction = await TransactionHelper.saveTransaction(newTransaction);
      return res.status(201).json({
        status: 201,
        message: "wallet successfully recharged",
        balance: Number(walletBalance),
        transactionDetails: savedTransaction,
      });
    }
    return res.status(500).json({
      status: 500,
      error: "server error",
    });
  }
  return res.status(500).json({
    status: 500,
    error: "server error",
  });
};

const deposit = async (req, res, next) => {
  const { wallet } = req;
  const { amount } = req.body;
  const walletBalance = wallet.balance - Number(amount);
  const account = await AccountHelper.accountExists("userId", wallet.userId);
  const updatedBalance = await WalletHelper.updateWalletAmount(
    walletBalance,
    wallet.userId
  );
  if (updatedBalance && updatedBalance[0] === 1) {
    const accountAmount = account.amount + Number(amount);
    const updatedAccount = await AccountHelper.updateAmount(
      accountAmount,
      account.accountNumber
    );
    if (updatedAccount && updatedAccount[0] === 1) {

      const toDate = new Date();
      const newTransaction = {
        transactionId: `${toDate.getTime()}_${wallet.userId}_${wallet.userId}`,
        senderId: wallet.userId,
        receiverId: wallet.userId,
        amountSent: amount,
        amountReceived: amount,
        exchangeRate: 1,
        transactionType: 'DEPOSIT',
        createdAt: toDate,
        updatedAt: toDate,
      };
      const savedTransaction = await TransactionHelper.saveTransaction(newTransaction);

      return res.status(201).json({
        status: 201,
        message: "Money deposited successfully",
        balance: Number(accountAmount),
        transactionDetails: savedTransaction,
      });
    }
    return res.status(500).json({
      status: 500,
      error: "server error",
    });
  }
  return res.status(500).json({
    status: 500,
    error: "server error",
  }); 
};

export { rechargeBalance, deposit };
