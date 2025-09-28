const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    price: { type: DataTypes.FLOAT, allowNull: false }
  });
};