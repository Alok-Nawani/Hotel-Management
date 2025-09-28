const { sequelize, Customer, MenuItem, User } = require('../models');
const bcrypt = require('bcryptjs');

async function seed(){
  await sequelize.sync({ force: true });
  
  // Create default admin user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  await User.create({
    username: 'admin',
    password: hashedPassword,
    name: 'Admin User',
    role: 'admin'
  });

  await Customer.bulkCreate([
    { name: 'Aman', phone: '9999990001' },
    { name: 'Riya', phone: '9999990002' }
  ]);
  
  await MenuItem.bulkCreate([
    { name: 'Margherita Pizza', price: 250, category: 'Pizza' },
    { name: 'Veg Biryani', price: 180, category: 'Rice' },
    { name: 'Cold Coffee', price: 80, category: 'Beverage' }
  ]);
  
  console.log('Seeded ✅');
  process.exit();
}
seed();