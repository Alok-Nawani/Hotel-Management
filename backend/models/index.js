const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Customer = require('./customer')(sequelize);
const MenuItem = require('./menuItem')(sequelize);
const Order = require('./order')(sequelize);
const OrderItem = require('./orderItem')(sequelize);
const Payment = require('./payment')(sequelize);
const User = require('./user')(sequelize);
const Staff = require('./staff')(sequelize);
const Inventory = require('./inventory')(sequelize);
const Review = require('./review')(sequelize);

// Associations
Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(Customer, { foreignKey: 'customerId' });

Order.belongsToMany(MenuItem, { through: OrderItem, foreignKey: 'orderId' });
MenuItem.belongsToMany(Order, { through: OrderItem, foreignKey: 'menuItemId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId' });
MenuItem.hasMany(OrderItem, { foreignKey: 'menuItemId' });

Order.hasOne(Payment, { foreignKey: 'orderId' });
Payment.belongsTo(Order, { foreignKey: 'orderId' });

// Review associations
Review.belongsTo(Customer, { foreignKey: 'customerId' });
Customer.hasMany(Review, { foreignKey: 'customerId' });

Review.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(Review, { foreignKey: 'orderId' });

module.exports = {
  sequelize,
  Customer,
  MenuItem,
  Order,
  OrderItem,
  Payment,
  User,
  Staff,
  Inventory,
  Review
};