import models from "../models";

const { Account } = models;

class AccountHelper {
  static async accountExists(attr, val) {
    const account = await Account.findOne({ where: { [attr]: val } });
    return account;
  }

  static async saveAccount(account) {
    const savedAccount = await Account.create(
      {
        ...account,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fields: ["accountName", "accountNumber", "pin", "userId", "amount"],
      }
    );
    return savedAccount;
  }
}
export default AccountHelper;
