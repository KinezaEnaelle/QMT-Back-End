"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Account.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Account.belongsTo(models.Bank, {
        foreignKey: "accountNumber",
      });
      Account.belongsTo(models.Wallet, {
        foreignKey: "userId",
      });
    }
  }
  Account.init(
    {
      accountName: DataTypes.STRING,
      accountNumber: DataTypes.INTEGER,
      pin: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
      currency: DataTypes.ENUM('RWF', 'UGX', 'KES', 'TZS', 'BIF'),
      salt: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
