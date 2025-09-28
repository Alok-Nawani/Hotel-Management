const { Staff } = require('../models');

const additionalStaffData = [
  // More Chefs
  { name: 'Rajesh Kumar', email: 'rajesh.kumar.chef2@restaurant.com', phone: '9876543210', role: 'chef', experience: 12, salary: 45000, dateOfBirth: '1985-03-15', shift: 'morning', isActive: true },
  { name: 'Priya Sharma', email: 'priya.sharma.chef@restaurant.com', phone: '9876543211', role: 'chef', experience: 8, salary: 40000, dateOfBirth: '1990-07-22', shift: 'evening', isActive: true },
  { name: 'Vikram Singh', email: 'vikram.singh.chef@restaurant.com', phone: '9876543212', role: 'chef', experience: 15, salary: 50000, dateOfBirth: '1982-11-08', shift: 'night', isActive: true },
  { name: 'Anita Patel', email: 'anita.patel.chef@restaurant.com', phone: '9876543213', role: 'chef', experience: 10, salary: 42000, dateOfBirth: '1988-04-12', shift: 'morning', isActive: true },
  { name: 'Suresh Reddy', email: 'suresh.reddy.chef@restaurant.com', phone: '9876543214', role: 'chef', experience: 14, salary: 48000, dateOfBirth: '1983-09-25', shift: 'afternoon', isActive: true },

  // More Cooks
  { name: 'Deepak Verma', email: 'deepak.verma.cook@restaurant.com', phone: '9876543215', role: 'cook', experience: 6, salary: 25000, dateOfBirth: '1992-01-18', shift: 'morning', isActive: true },
  { name: 'Sunita Joshi', email: 'sunita.joshi.cook@restaurant.com', phone: '9876543216', role: 'cook', experience: 4, salary: 22000, dateOfBirth: '1995-06-30', shift: 'afternoon', isActive: true },
  { name: 'Ravi Kumar', email: 'ravi.kumar.cook@restaurant.com', phone: '9876543217', role: 'cook', experience: 7, salary: 26000, dateOfBirth: '1991-12-14', shift: 'evening', isActive: true },
  { name: 'Meera Singh', email: 'meera.singh.cook@restaurant.com', phone: '9876543218', role: 'cook', experience: 5, salary: 24000, dateOfBirth: '1993-08-07', shift: 'night', isActive: true },
  { name: 'Ajay Gupta', email: 'ajay.gupta.cook@restaurant.com', phone: '9876543219', role: 'cook', experience: 8, salary: 27000, dateOfBirth: '1990-05-20', shift: 'morning', isActive: true },
  { name: 'Kavita Sharma', email: 'kavita.sharma.cook@restaurant.com', phone: '9876543220', role: 'cook', experience: 3, salary: 21000, dateOfBirth: '1996-10-03', shift: 'afternoon', isActive: true },
  { name: 'Manoj Tiwari', email: 'manoj.tiwari.cook@restaurant.com', phone: '9876543221', role: 'cook', experience: 6, salary: 25000, dateOfBirth: '1992-02-28', shift: 'evening', isActive: true },
  { name: 'Pooja Agarwal', email: 'pooja.agarwal.cook@restaurant.com', phone: '9876543222', role: 'cook', experience: 4, salary: 23000, dateOfBirth: '1994-11-15', shift: 'night', isActive: true },

  // More Waiters
  { name: 'Rohit Mehta', email: 'rohit.mehta.waiter@restaurant.com', phone: '9876543223', role: 'waiter', experience: 3, salary: 18000, dateOfBirth: '1995-04-10', shift: 'morning', isActive: true },
  { name: 'Sneha Nair', email: 'sneha.nair.waiter@restaurant.com', phone: '9876543224', role: 'waiter', experience: 2, salary: 16000, dateOfBirth: '1997-08-25', shift: 'afternoon', isActive: true },
  { name: 'Arjun Desai', email: 'arjun.desai.waiter@restaurant.com', phone: '9876543225', role: 'waiter', experience: 4, salary: 19000, dateOfBirth: '1993-12-05', shift: 'evening', isActive: true },
  { name: 'Neha Iyer', email: 'neha.iyer.waiter@restaurant.com', phone: '9876543226', role: 'waiter', experience: 3, salary: 17500, dateOfBirth: '1994-07-18', shift: 'night', isActive: true },
  { name: 'Kiran Shah', email: 'kiran.shah.waiter@restaurant.com', phone: '9876543227', role: 'waiter', experience: 5, salary: 20000, dateOfBirth: '1991-03-22', shift: 'morning', isActive: true },
  { name: 'Divya Rao', email: 'divya.rao.waiter@restaurant.com', phone: '9876543228', role: 'waiter', experience: 2, salary: 16500, dateOfBirth: '1996-09-12', shift: 'afternoon', isActive: true },
  { name: 'Vishal Jain', email: 'vishal.jain.waiter@restaurant.com', phone: '9876543229', role: 'waiter', experience: 3, salary: 18000, dateOfBirth: '1995-01-30', shift: 'evening', isActive: true },
  { name: 'Shruti Kapoor', email: 'shruti.kapoor.waiter@restaurant.com', phone: '9876543230', role: 'waiter', experience: 4, salary: 18500, dateOfBirth: '1993-06-08', shift: 'night', isActive: true },

  // More Cashiers
  { name: 'Rakesh Kumar', email: 'rakesh.kumar.cashier@restaurant.com', phone: '9876543231', role: 'cashier', experience: 6, salary: 22000, dateOfBirth: '1990-11-14', shift: 'morning', isActive: true },
  { name: 'Geeta Singh', email: 'geeta.singh.cashier@restaurant.com', phone: '9876543232', role: 'cashier', experience: 4, salary: 20000, dateOfBirth: '1992-05-27', shift: 'afternoon', isActive: true },
  { name: 'Nitin Agarwal', email: 'nitin.agarwal.cashier@restaurant.com', phone: '9876543233', role: 'cashier', experience: 5, salary: 21000, dateOfBirth: '1991-08-19', shift: 'evening', isActive: true },
  { name: 'Ritu Verma', email: 'ritu.verma.cashier@restaurant.com', phone: '9876543234', role: 'cashier', experience: 3, salary: 19000, dateOfBirth: '1994-02-11', shift: 'night', isActive: true },

  // More Cleaners
  { name: 'Ram Prasad', email: 'ram.prasad.cleaner@restaurant.com', phone: '9876543235', role: 'cleaner', experience: 8, salary: 15000, dateOfBirth: '1985-10-16', shift: 'morning', isActive: true },
  { name: 'Lakshmi Devi', email: 'lakshmi.devi.cleaner@restaurant.com', phone: '9876543236', role: 'cleaner', experience: 6, salary: 14000, dateOfBirth: '1987-04-23', shift: 'afternoon', isActive: true },
  { name: 'Suresh Kumar', email: 'suresh.kumar.cleaner@restaurant.com', phone: '9876543237', role: 'cleaner', experience: 7, salary: 14500, dateOfBirth: '1986-07-09', shift: 'evening', isActive: true },
  { name: 'Kamala Bai', email: 'kamala.bai.cleaner@restaurant.com', phone: '9876543238', role: 'cleaner', experience: 5, salary: 13500, dateOfBirth: '1989-12-31', shift: 'night', isActive: true },

  // More Security
  { name: 'Bharat Singh', email: 'bharat.singh.security@restaurant.com', phone: '9876543239', role: 'security', experience: 10, salary: 20000, dateOfBirth: '1980-03-17', shift: 'morning', isActive: true },
  { name: 'Jagdish Yadav', email: 'jagdish.yadav.security@restaurant.com', phone: '9876543240', role: 'security', experience: 8, salary: 19000, dateOfBirth: '1982-09-24', shift: 'afternoon', isActive: true },
  { name: 'Ram Singh', email: 'ram.singh.security@restaurant.com', phone: '9876543241', role: 'security', experience: 12, salary: 21000, dateOfBirth: '1978-06-13', shift: 'evening', isActive: true },
  { name: 'Shyam Kumar', email: 'shyam.kumar.security@restaurant.com', phone: '9876543242', role: 'security', experience: 9, salary: 19500, dateOfBirth: '1981-01-26', shift: 'night', isActive: true },

  // More Managers
  { name: 'Rajesh Agarwal', email: 'rajesh.agarwal.manager@restaurant.com', phone: '9876543243', role: 'manager', experience: 15, salary: 60000, dateOfBirth: '1975-08-14', shift: 'morning', isActive: true },
  { name: 'Priya Reddy', email: 'priya.reddy.manager@restaurant.com', phone: '9876543244', role: 'manager', experience: 12, salary: 55000, dateOfBirth: '1978-11-07', shift: 'afternoon', isActive: true }
];

async function seedMoreStaff() {
  try {
    console.log('🌱 Seeding additional staff data...');
    
    for (const staffData of additionalStaffData) {
      await Staff.create(staffData);
    }
    
    console.log(`✅ Successfully seeded ${additionalStaffData.length} additional staff members`);
  } catch (error) {
    console.error('❌ Error seeding additional staff:', error);
  }
}

module.exports = { seedMoreStaff };
