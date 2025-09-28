const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Inventory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    category: {
      type: DataTypes.ENUM(
        'furniture', 'kitchen_equipment', 'food_supplies', 'cleaning_supplies', 
        'utensils', 'electronics', 'decorations', 'maintenance', 'other'
      ),
      allowNull: false
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: true
    },
    currentStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    minimumStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 0
      }
    },
    maximumStock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pieces'
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    supplier: {
      type: DataTypes.STRING,
      allowNull: true
    },
    supplierContact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastRestocked: {
      type: DataTypes.DATE,
      allowNull: true
    },
    nextRestockDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    alertEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'inventory',
    timestamps: true,
    indexes: [
      {
        fields: ['category']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['alertEnabled']
      }
    ]
  });
};
