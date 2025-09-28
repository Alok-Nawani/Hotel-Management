const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Staff', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 15]
      }
    },
    role: {
      type: DataTypes.ENUM('chef', 'cook', 'waiter', 'manager', 'cashier', 'cleaner', 'security'),
      allowNull: false
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 50
      }
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dateOfJoining: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    emergencyContact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emergencyContactPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const value = this.getDataValue('skills');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('skills', JSON.stringify(value));
      }
    },
    shift: {
      type: DataTypes.ENUM('morning', 'afternoon', 'evening', 'night'),
      allowNull: true
    }
  }, {
    tableName: 'staff',
    timestamps: true,
    indexes: [
      {
        fields: ['role']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['email']
      }
    ]
  });
};
