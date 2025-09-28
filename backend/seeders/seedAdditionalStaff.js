const { Staff } = require('../models');

const additionalStaffData = [
  // Additional Chefs
  {
    name: 'Arvind Patel',
    email: 'arvind.patel@restaurant.com',
    phone: '+919876543240',
    role: 'chef',
    experience: 18,
    salary: 52000,
    address: '101 Patel Street, Mumbai',
    dateOfBirth: '1982-11-15',
    dateOfJoining: '2019-08-01',
    shift: 'morning',
    emergencyContact: 'Kavita Patel',
    emergencyContactPhone: '+919876543241',
    skills: ['Gujarati Cuisine', 'North Indian', 'Tandoor Cooking', 'Menu Development']
  },
  {
    name: 'Sunita Sharma',
    email: 'sunita.sharma@restaurant.com',
    phone: '+919876543242',
    role: 'chef',
    experience: 14,
    salary: 48000,
    address: '202 Sharma Nagar, Mumbai',
    dateOfBirth: '1986-04-22',
    dateOfJoining: '2020-03-15',
    shift: 'evening',
    emergencyContact: 'Rajesh Sharma',
    emergencyContactPhone: '+919876543243',
    skills: ['South Indian Cuisine', 'Dosa Specialist', 'Sambhar Expert', 'Traditional Cooking']
  },

  // Additional Cooks
  {
    name: 'Kiran Singh',
    email: 'kiran.singh@restaurant.com',
    phone: '+919876543244',
    role: 'cook',
    experience: 9,
    salary: 30000,
    address: '303 Singh Colony, Mumbai',
    dateOfBirth: '1991-07-08',
    dateOfJoining: '2021-11-01',
    shift: 'morning',
    emergencyContact: 'Amar Singh',
    emergencyContactPhone: '+919876543245',
    skills: ['Punjabi Cuisine', 'Tandoori Cooking', 'Curry Preparation']
  },
  {
    name: 'Meera Reddy',
    email: 'meera.reddy@restaurant.com',
    phone: '+919876543246',
    role: 'cook',
    experience: 7,
    salary: 28000,
    address: '404 Reddy Street, Mumbai',
    dateOfBirth: '1993-12-14',
    dateOfJoining: '2022-06-01',
    shift: 'afternoon',
    emergencyContact: 'Venkat Reddy',
    emergencyContactPhone: '+919876543247',
    skills: ['Andhra Cuisine', 'Spicy Cooking', 'Rice Preparations']
  },
  {
    name: 'Ravi Kumar',
    email: 'ravi.kumar@restaurant.com',
    phone: '+919876543248',
    role: 'cook',
    experience: 5,
    salary: 26000,
    address: '505 Kumar Lane, Mumbai',
    dateOfBirth: '1995-03-25',
    dateOfJoining: '2023-01-15',
    shift: 'evening',
    emergencyContact: 'Sushila Kumar',
    emergencyContactPhone: '+919876543249',
    skills: ['Bihari Cuisine', 'Street Food', 'Quick Service']
  },

  // Additional Waiters
  {
    name: 'Priya Gupta',
    email: 'priya.gupta@restaurant.com',
    phone: '+919876543250',
    role: 'waiter',
    experience: 6,
    salary: 20000,
    address: '606 Gupta Road, Mumbai',
    dateOfBirth: '1992-09-10',
    dateOfJoining: '2021-04-01',
    shift: 'morning',
    emergencyContact: 'Amit Gupta',
    emergencyContactPhone: '+919876543251',
    skills: ['Customer Service', 'Table Service', 'Wine Knowledge', 'Event Management']
  },
  {
    name: 'Suresh Yadav',
    email: 'suresh.yadav@restaurant.com',
    phone: '+919876543252',
    role: 'waiter',
    experience: 4,
    salary: 19000,
    address: '707 Yadav Nagar, Mumbai',
    dateOfBirth: '1994-06-18',
    dateOfJoining: '2022-09-01',
    shift: 'afternoon',
    emergencyContact: 'Geeta Yadav',
    emergencyContactPhone: '+919876543253',
    skills: ['Customer Service', 'POS System', 'Upselling', 'Team Work']
  },
  {
    name: 'Anita Joshi',
    email: 'anita.joshi@restaurant.com',
    phone: '+919876543254',
    role: 'waiter',
    experience: 3,
    salary: 18000,
    address: '808 Joshi Street, Mumbai',
    dateOfBirth: '1996-01-30',
    dateOfJoining: '2023-03-01',
    shift: 'evening',
    emergencyContact: 'Vikram Joshi',
    emergencyContactPhone: '+919876543255',
    skills: ['Customer Service', 'Bar Service', 'Multilingual', 'Problem Solving']
  },
  {
    name: 'Rajesh Tiwari',
    email: 'rajesh.tiwari@restaurant.com',
    phone: '+919876543256',
    role: 'waiter',
    experience: 5,
    salary: 19500,
    address: '909 Tiwari Lane, Mumbai',
    dateOfBirth: '1993-08-12',
    dateOfJoining: '2021-12-01',
    shift: 'night',
    emergencyContact: 'Poonam Tiwari',
    emergencyContactPhone: '+919876543257',
    skills: ['Customer Service', 'Late Night Service', 'Security Awareness', 'Emergency Response']
  },

  // Additional Cashiers
  {
    name: 'Pooja Agarwal',
    email: 'pooja.agarwal@restaurant.com',
    phone: '+919876543258',
    role: 'cashier',
    experience: 6,
    salary: 22000,
    address: '110 Agarwal Complex, Mumbai',
    dateOfBirth: '1990-05-20',
    dateOfJoining: '2021-07-01',
    shift: 'morning',
    emergencyContact: 'Rohit Agarwal',
    emergencyContactPhone: '+919876543259',
    skills: ['Cash Handling', 'Accounting', 'Customer Service', 'Inventory Management']
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh.cashier@restaurant.com',
    phone: '+919876543260',
    role: 'cashier',
    experience: 4,
    salary: 21000,
    address: '211 Singh Plaza, Mumbai',
    dateOfBirth: '1994-10-05',
    dateOfJoining: '2022-10-01',
    shift: 'afternoon',
    emergencyContact: 'Kavita Singh',
    emergencyContactPhone: '+919876543261',
    skills: ['Cash Handling', 'POS System', 'Customer Service', 'Data Entry']
  },

  // Additional Cleaners
  {
    name: 'Kamala Devi',
    email: 'kamala.devi@restaurant.com',
    phone: '+919876543262',
    role: 'cleaner',
    experience: 8,
    salary: 16000,
    address: '312 Devi Colony, Mumbai',
    dateOfBirth: '1988-02-14',
    dateOfJoining: '2020-12-01',
    shift: 'morning',
    emergencyContact: 'Ram Devi',
    emergencyContactPhone: '+919876543263',
    skills: ['Deep Cleaning', 'Sanitization', 'Equipment Maintenance', 'Waste Management']
  },
  {
    name: 'Abdul Rahman',
    email: 'abdul.rahman@restaurant.com',
    phone: '+919876543264',
    role: 'cleaner',
    experience: 6,
    salary: 16000,
    address: '413 Rahman Street, Mumbai',
    dateOfBirth: '1990-11-28',
    dateOfJoining: '2021-05-01',
    shift: 'night',
    emergencyContact: 'Fatima Rahman',
    emergencyContactPhone: '+919876543265',
    skills: ['Deep Cleaning', 'Floor Care', 'Equipment Maintenance', 'Safety Protocols']
  },

  // Additional Security
  {
    name: 'Bharat Singh',
    email: 'bharat.singh@restaurant.com',
    phone: '+919876543266',
    role: 'security',
    experience: 10,
    salary: 25000,
    address: '514 Singh Quarters, Mumbai',
    dateOfBirth: '1984-09-03',
    dateOfJoining: '2020-01-01',
    shift: 'night',
    emergencyContact: 'Sunita Singh',
    emergencyContactPhone: '+919876543267',
    skills: ['Security Management', 'CCTV Monitoring', 'Emergency Response', 'Crowd Control', 'First Aid']
  },
  {
    name: 'Ramesh Kumar',
    email: 'ramesh.kumar@restaurant.com',
    phone: '+919876543268',
    role: 'security',
    experience: 7,
    salary: 23000,
    address: '615 Kumar Nagar, Mumbai',
    dateOfBirth: '1987-06-15',
    dateOfJoining: '2021-08-01',
    shift: 'morning',
    emergencyContact: 'Sita Kumar',
    emergencyContactPhone: '+919876543269',
    skills: ['Security Management', 'Access Control', 'Emergency Response', 'Customer Service']
  },

  // Additional Managers
  {
    name: 'Anjali Mehta',
    email: 'anjali.mehta@restaurant.com',
    phone: '+919876543270',
    role: 'manager',
    experience: 12,
    salary: 60000,
    address: '716 Mehta Tower, Mumbai',
    dateOfBirth: '1985-12-08',
    dateOfJoining: '2019-06-01',
    shift: 'morning',
    emergencyContact: 'Rohit Mehta',
    emergencyContactPhone: '+919876543271',
    skills: ['Restaurant Management', 'Staff Training', 'Financial Planning', 'Customer Relations', 'Marketing']
  },

  // Additional Cooks (More)
  {
    name: 'Santosh Pandey',
    email: 'santosh.pandey@restaurant.com',
    phone: '+919876543272',
    role: 'cook',
    experience: 8,
    salary: 29000,
    address: '817 Pandey Street, Mumbai',
    dateOfBirth: '1992-04-12',
    dateOfJoining: '2021-02-01',
    shift: 'afternoon',
    emergencyContact: 'Rekha Pandey',
    emergencyContactPhone: '+919876543273',
    skills: ['Uttar Pradesh Cuisine', 'Street Food', 'Traditional Cooking']
  },
  {
    name: 'Lakshmi Nair',
    email: 'lakshmi.nair@restaurant.com',
    phone: '+919876543274',
    role: 'cook',
    experience: 6,
    salary: 27000,
    address: '918 Nair Lane, Mumbai',
    dateOfBirth: '1994-07-25',
    dateOfJoining: '2022-04-01',
    shift: 'evening',
    emergencyContact: 'Krishnan Nair',
    emergencyContactPhone: '+919876543275',
    skills: ['Kerala Cuisine', 'Coconut Cooking', 'Seafood Specialist']
  }
];

async function seedAdditionalStaff() {
  try {
    console.log('Seeding additional staff data...');
    
    for (const staff of additionalStaffData) {
      await Staff.create(staff);
    }
    
    console.log(`✅ Seeded ${additionalStaffData.length} additional staff members successfully!`);
  } catch (error) {
    console.error('❌ Error seeding additional staff:', error);
  }
}

module.exports = { seedAdditionalStaff };
