const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('MenuItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.STRING },
    isVeg: { type: DataTypes.BOOLEAN, defaultValue: true },
    available: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
};