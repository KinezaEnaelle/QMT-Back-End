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
        fields: ["userId", "balance", "currency"],
      }
    );
    return savedWallet;
  }

  static async updateWalletAmount(balance, userId) {
    const updatedWallet = await Wallet.update(
      {
        balance: balance,
      },
      {
        where: {
          userId: userId,
        },
      }
    );
    return updatedWallet;
  }
}
export default WalletHelper;
