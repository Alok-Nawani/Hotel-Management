const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Customer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING },
    loyaltyPoints: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};