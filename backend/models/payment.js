const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    method: { type: DataTypes.STRING }, // CASH, CARD, UPI
    amount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'COMPLETED' }
  });
};