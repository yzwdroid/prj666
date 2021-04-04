"use strict";

const model = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "Orders",
    {
      order_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      order_date: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
      order_status: DataTypes.STRING,
      order_shipping_address_id: DataTypes.INTEGER,
      transaction_id: DataTypes.STRING,
      tax_rate: DataTypes.DOUBLE,
      order_total_plus_tax: DataTypes.DOUBLE,
    },
    {
      indexes: [
        { unique: true, fields: ["order_id"] },
      ],
    }
  );

  return Orders;
};

module.exports = model;
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Orders extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Orders.init(
//     {
//       order_id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV1,
//         primaryKey: true,
//       },
//       order_date: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
//       order_status: DataTypes.STRING,
//       order_shipping_address_id: DataTypes.INTEGER,
//       transaction_id: DataTypes.STRING,
//       tax_rate: DataTypes.DOUBLE,
//       order_total_plus_tax: DataTypes.DOUBLE,
//     },
//     {
//       sequelize,
//       modelName: "Orders",
//     }
//   );
//   return Orders;
// };
