import models from "../models";

const { Transaction } = models;

class TransactionHelper {
  static async transactionExists(attr, val) {
    const transaction = await Transaction.findOne({ where: { [attr]: val } });
    return transaction;
  }

  static async saveTransaction(transaction) {
    const savedTransaction = await Transaction.create(
      {
        ...transaction,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fields: [
          "transactionId",
          "senderId",
          "receiverId",
          "amountSent",
          "amountReceived",
          "exchangeRate",
          "transactionType",
          "createdAt",
          "updatedAt",
        ],
      }
    );
    return savedTransaction;
  }
}
export default TransactionHelper;
