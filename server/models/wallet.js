"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Wallet.hasMany(models.Account, {
        foreignKey: "userId",
        as: "accounts",
      });
    }
  }
  Wallet.init(
    {
      userId: DataTypes.INTEGER,
      balance: DataTypes.INTEGER,
      currency: DataTypes.ENUM('RWF', 'UGX', 'KES', 'TZS', 'BIF'),
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};
