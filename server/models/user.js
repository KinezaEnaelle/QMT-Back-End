"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasMany(models.Account, {
        foreignKey: "userId",
        as: "accounts",
      });
    }
  }
  User.init(
    {
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      email: DataTypes.STRING,
      country: DataTypes.ENUM(
        "BURUNDI",
        "RWANDA",
        "KENYA",
        "UGANDA",
        "TANZANIA"
      ),
      phoneNumber: DataTypes.STRING,
      password: DataTypes.TEXT,
      salt: DataTypes.TEXT,
      role: DataTypes.ENUM("ADMIN", "USER"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
