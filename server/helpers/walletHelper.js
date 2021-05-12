import models from "../models";

const { Wallet } = models;

class WalletHelper {
  static async walletExists(attr, val) {
    const wallet = await Wallet.findOne({ where: { [attr]: val } });
    return wallet;
  }

  static async saveWallet(wallet) {
    const savedWallet = await Wallet.create(
      {
        ...wallet,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fields: ["userId", "balance"],
      }
    );
    return savedWallet;
  }
}
export default WalletHelper;
