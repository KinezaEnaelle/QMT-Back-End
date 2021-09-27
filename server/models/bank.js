"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Bank.hasMany(models.Account, {
        foreignKey: "bankId",
        as: "accounts",
      });
    }
  }
  Bank.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.ENUM(
        "BURUNDI",
        "RWANDA",
        "KENYA",
        "UGANDA",
        "TANZANIA"
      ),
    },
    {
      sequelize,
      modelName: "Bank",
    }
  );
  return Bank;
};
