'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      country: {
        type: Sequelize.ENUM('BURUNDI','RWANDA','KENYA','UGANDA','TANZANIA')
      },
      phoneNumber: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.TEXT
      },
      salt: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.ENUM('ADMIN','USER')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};