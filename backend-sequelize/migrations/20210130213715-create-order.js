"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Order", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      order_date: {
        type: Sequelize.DATE,
      },
      order_status: {
        type: Sequelize.STRING(35),
      },
      order_shipping_address_id: {
        type: Sequelize.INTEGER(11),
      },
      invoice_id: {
        type: Sequelize.INTEGER(11),
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Order");
  },
};
