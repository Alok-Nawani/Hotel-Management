const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tableNumber: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: 'PENDING' }, // PENDING, PREPARING, SERVED, PAID
    total: { type: DataTypes.FLOAT, defaultValue: 0 }
  });
};