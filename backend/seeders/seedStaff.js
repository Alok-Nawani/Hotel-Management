const { Staff } = require('../models');

const staffData = [
  // Chefs
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@restaurant.com',
    phone: '+919876543210',
    role: 'chef',
    experience: 15,
    salary: 45000,
    address: '123 Main Street, Mumbai',
    dateOfBirth: '1985-03-15',
    dateOfJoining: '2020-01-15',
    shift: 'morning',
    emergencyContact: 'Sunita Kumar',
    emergencyContactPhone: '+919876543211',
    skills: ['Indian Cuisine', 'Tandoor Cooking', 'Menu Planning', 'Team Management']
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@restaurant.com',
    phone: '+919876543212',
    role: 'chef',
    experience: 12,
    salary: 42000,
    address: '456 Park Avenue, Mumbai',
    dateOfBirth: '1988-07-22',
    dateOfJoining: '2021-03-10',
    shift: 'evening',
    emergencyContact: 'Amit Sharma',
    emergencyContactPhone: '+919876543213',
    skills: ['Continental Cuisine', 'Baking', 'Food Safety', 'Cost Control']
  },

  // Cooks
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@restaurant.com',
    phone: '+919876543214',
    role: 'cook',
    experience: 8,
    salary: 28000,
    address: '789 Garden Road, Mumbai',
    dateOfBirth: '1992-11-08',
    dateOfJoining: '2022-06-01',
    shift: 'morning',
    emergencyContact: 'Kavita Singh',
    emergencyContactPhone: '+919876543215',
    skills: ['Vegetarian Cooking', 'South Indian Cuisine', 'Prep Work']
  },
  {
    name: 'Anita Patel',
    email: 'anita.patel@restaurant.com',
    phone: '+919876543216',
    role: 'cook',
    experience: 6,
    salary: 25000,
    address: '321 Lake View, Mumbai',
    dateOfBirth: '1995-04-12',
    dateOfJoining: '2023-01-15',
    shift: 'afternoon',
    emergencyContact: 'Ramesh Patel',
    emergencyContactPhone: '+919876543217',
    skills: ['Gujarati Cuisine', 'Snacks', 'Quick Service']
  },

  // Waiters
  {
    name: 'Suresh Kumar',
    email: 'suresh.kumar@restaurant.com',
    phone: '+919876543218',
    role: 'waiter',
    experience: 5,
    salary: 18000,
    address: '654 Hill Station, Mumbai',
    dateOfBirth: '1990-09-25',
    dateOfJoining: '2022-08-01',
    shift: 'evening',
    emergencyContact: 'Meera Kumar',
    emergencyContactPhone: '+919876543219',
    skills: ['Customer Service', 'Table Service', 'Upselling', 'POS System']
  },
  {
    name: 'Deepika Reddy',
    email: 'deepika.reddy@restaurant.com',
    phone: '+919876543220',
    role: 'waiter',
    experience: 4,
    salary: 17000,
    address: '987 Beach Road, Mumbai',
    dateOfBirth: '1993-12-03',
    dateOfJoining: '2023-02-10',
    shift: 'morning',
    emergencyContact: 'Kiran Reddy',
    emergencyContactPhone: '+919876543221',
    skills: ['Customer Service', 'Wine Knowledge', 'Event Service']
  },
  {
    name: 'Arjun Mehta',
    email: 'arjun.mehta@restaurant.com',
    phone: '+919876543222',
    role: 'waiter',
    experience: 3,
    salary: 16000,
    address: '147 River Side, Mumbai',
    dateOfBirth: '1996-06-18',
    dateOfJoining: '2023-05-01',
    shift: 'night',
    emergencyContact: 'Pooja Mehta',
    emergencyContactPhone: '+919876543223',
    skills: ['Customer Service', 'Bar Service', 'Late Night Service']
  },

  // Manager
  {
    name: 'Ravi Agarwal',
    email: 'ravi.agarwal@restaurant.com',
    phone: '+919876543224',
    role: 'manager',
    experience: 10,
    salary: 55000,
    address: '258 Business District, Mumbai',
    dateOfBirth: '1987-01-30',
    dateOfJoining: '2020-06-01',
    shift: 'morning',
    emergencyContact: 'Shilpa Agarwal',
    emergencyContactPhone: '+919876543225',
    skills: ['Restaurant Management', 'Staff Training', 'Inventory Management', 'Financial Planning']
  },

  // Cashiers
  {
    name: 'Neha Gupta',
    email: 'neha.gupta@restaurant.com',
    phone: '+919876543226',
    role: 'cashier',
    experience: 4,
    salary: 20000,
    address: '369 Market Street, Mumbai',
    dateOfBirth: '1994-08-14',
    dateOfJoining: '2022-09-01',
    shift: 'afternoon',
    emergencyContact: 'Rohit Gupta',
    emergencyContactPhone: '+919876543227',
    skills: ['Cash Handling', 'POS System', 'Customer Service', 'Accounting']
  },
  {
    name: 'Karan Malhotra',
    email: 'karan.malhotra@restaurant.com',
    phone: '+919876543228',
    role: 'cashier',
    experience: 2,
    salary: 18000,
    address: '741 Shopping Center, Mumbai',
    dateOfBirth: '1998-02-28',
    dateOfJoining: '2023-07-01',
    shift: 'evening',
    emergencyContact: 'Sonia Malhotra',
    emergencyContactPhone: '+919876543229',
    skills: ['Cash Handling', 'POS System', 'Customer Service']
  },

  // Cleaners
  {
    name: 'Lakshmi Devi',
    email: 'lakshmi.devi@restaurant.com',
    phone: '+919876543230',
    role: 'cleaner',
    experience: 7,
    salary: 15000,
    address: '852 Workers Colony, Mumbai',
    dateOfBirth: '1989-05-10',
    dateOfJoining: '2021-11-01',
    shift: 'morning',
    emergencyContact: 'Ram Devi',
    emergencyContactPhone: '+919876543231',
    skills: ['Deep Cleaning', 'Sanitization', 'Equipment Maintenance']
  },
  {
    name: 'Mohammed Ali',
    email: 'mohammed.ali@restaurant.com',
    phone: '+919876543232',
    role: 'cleaner',
    experience: 5,
    salary: 15000,
    address: '963 Old City, Mumbai',
    dateOfBirth: '1991-10-05',
    dateOfJoining: '2022-12-01',
    shift: 'night',
    emergencyContact: 'Fatima Ali',
    emergencyContactPhone: '+919876543233',
    skills: ['Deep Cleaning', 'Waste Management', 'Equipment Maintenance']
  },

  // Security
  {
    name: 'Jagdish Singh',
    email: 'jagdish.singh@restaurant.com',
    phone: '+919876543234',
    role: 'security',
    experience: 8,
    salary: 22000,
    address: '159 Security Quarters, Mumbai',
    dateOfBirth: '1986-12-20',
    dateOfJoining: '2021-04-01',
    shift: 'night',
    emergencyContact: 'Kamla Singh',
    emergencyContactPhone: '+919876543235',
    skills: ['Security Management', 'CCTV Monitoring', 'Emergency Response', 'Crowd Control']
  }
];

async function seedStaff() {
  try {
    console.log('Seeding staff data...');
    
    for (const staff of staffData) {
      await Staff.create(staff);
    }
    
    console.log(`✅ Seeded ${staffData.length} staff members successfully!`);
  } catch (error) {
    console.error('❌ Error seeding staff:', error);
  }
}

module.exports = { seedStaff };
