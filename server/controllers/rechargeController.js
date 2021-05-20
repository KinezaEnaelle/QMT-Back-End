import AccountHelper from "../helpers/accountHelper";
import WalletHelper from "../helpers/walletHelper";

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
      return res.status(201).json({
        status: 201,
        message: "wallet successfully recharged",
        balance: Number(walletBalance),
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

export { rechargeBalance };
