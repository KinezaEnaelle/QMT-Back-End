'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    transactionId: DataTypes.STRING,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    amountSent: DataTypes.FLOAT,
    amountReceived: DataTypes.FLOAT,
    exchangeRate: DataTypes.FLOAT,
    transactionType: DataTypes.ENUM("RECHARGE","SEND","DEPOSIT")
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};