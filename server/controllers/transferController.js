import currencyConverter from 'currency-converter-lt';
import WalletHelper from '../helpers/walletHelper';
import passwordHashHelper from "../helpers/passwordHashHelper";
import TransactionHelper from '../helpers/transactionHelper';

const convertMoney = async (req, res) => {
  const { toCurrency, wallet } = req;
  const { amount } = req.body;
  const convert = new currencyConverter({ from: wallet.currency, to: toCurrency, amount: Number(amount) });
  let afterConversion = await convert.convert();

  res.status(200).json({
    status: 200,
    message: `we'll do this in a while`,
    convertingFrom: wallet.currency,
    convertingTo: req.toCurrency,
    beforeConversion: amount,
    afterConversion
  });
};

const transferMoney = async (req, res) => {

  const { toCurrency, wallet, toUser, user } = req;
  const { amount, phoneNumber } = req.body;
  console.log(req.user.password)
  if(req.user) {
    const passwordExist = await passwordHashHelper.checkPassword(
      req.body.password,
      req.user.password
    );
    if(passwordExist) {
      const convert = new currencyConverter({ from: wallet.currency, to: toCurrency, amount: Number(amount) });
      let afterConversion = await convert.convert();
      const updateSenderWallet = await WalletHelper.updateWalletAmount(wallet.balance-amount, user.id);
      if(updateSenderWallet) {
        const initialWallet = await WalletHelper.walletExists('userId', toUser.id);
        const updateReceiverWallet = await WalletHelper.updateWalletAmount(initialWallet.balance+Number(afterConversion), toUser.id);
        
      const toDate = new Date();
      const newTransaction = {
        transactionId: `${toDate.getTime()}_${user.id}_${toUser.id}`,
        senderId: user.id,
        receiverId: toUser.id,
        amountSent: amount,
        amountReceived: afterConversion,
        exchangeRate: (amount/afterConversion),
        transactionType: 'SEND',
        createdAt: toDate,
        updatedAt: toDate,
      };
      const savedTransaction = await TransactionHelper.saveTransaction(newTransaction);
        
        return res.status(201).json({
          status: 201,
          message: 'money sent successfylly',
          balance: wallet.balance-amount,
          transactionDetails: savedTransaction,
        });
      }
    }
    return res.status(401).json({
      status: 401,
      error: "Email or Password is incorrect",
    });
  }
}

export { transferMoney, convertMoney };
