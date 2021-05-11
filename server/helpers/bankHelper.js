import models from "../models";

const { Bank } = models;

class BankHelper {
  static async bankExists(attr, val) {
    const bank = await Bank.findOne({ where: { [attr]: val } });
    return bank;
  }

  static async saveBank(bank) {
    const savedBank = await Bank.create(
      {
        ...bank,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fields: ["name", "location"],
      }
    );
    return savedBank;
  }
}
export default BankHelper;
