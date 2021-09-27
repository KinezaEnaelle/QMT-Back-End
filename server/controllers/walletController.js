import WalletHelper from "../helpers/walletHelper";
import models from '../models';
const { Wallet } = models;

const addWallet = async (req, res) => {
  const { userId, balance } = req.body;
  const wallet = { userId, balance };
  const createWallet = await WalletHelper.saveWallet(wallet);
  if (createWallet) {
    return res.status(201).json({
      status: 201,
      message: "Successfully Created",
    });
  }

  return res.status(400).json({
    status: 400,
    error: "Bad request",
  });
};
const viewWalletInfo = async (req, res) => {
  const userId = req.params.id;
  const foundWallet = await Wallet.findOne({where: {userId:userId}});
  if(!foundWallet){
    return res.status(404).json({
      status: 404,
      error: 'Wallet not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: {
      userId: foundWallet.userId,
      balance: foundWallet.balance,
      currency: foundWallet.currency
    }
  });
}
export { addWallet, viewWalletInfo };
