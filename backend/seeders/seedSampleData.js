const { Customer, Order, OrderItem, MenuItem, Review } = require('../models');

const sampleCustomers = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+919876543001',
    address: '123 MG Road, Mumbai',
    dateOfBirth: '1985-03-15'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+919876543002',
    address: '456 Bandra West, Mumbai',
    dateOfBirth: '1990-07-22'
  },
  {
    name: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+919876543003',
    address: '789 Andheri East, Mumbai',
    dateOfBirth: '1988-11-08'
  },
  {
    name: 'Sunita Reddy',
    email: 'sunita.reddy@email.com',
    phone: '+919876543004',
    address: '321 Powai, Mumbai',
    dateOfBirth: '1992-05-14'
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+919876543005',
    address: '654 Goregaon, Mumbai',
    dateOfBirth: '1987-09-30'
  },
  {
    name: 'Kavita Joshi',
    email: 'kavita.joshi@email.com',
    phone: '+919876543006',
    address: '987 Malad West, Mumbai',
    dateOfBirth: '1991-12-03'
  },
  {
    name: 'Ramesh Gupta',
    email: 'ramesh.gupta@email.com',
    phone: '+919876543007',
    address: '147 Borivali East, Mumbai',
    dateOfBirth: '1986-08-17'
  },
  {
    name: 'Anita Mehta',
    email: 'anita.mehta@email.com',
    phone: '+919876543008',
    address: '258 Kandivali West, Mumbai',
    dateOfBirth: '1989-04-25'
  },
  {
    name: 'Suresh Yadav',
    email: 'suresh.yadav@email.com',
    phone: '+919876543009',
    address: '369 Chembur, Mumbai',
    dateOfBirth: '1993-01-12'
  },
  {
    name: 'Pooja Agarwal',
    email: 'pooja.agarwal@email.com',
    phone: '+919876543010',
    address: '741 Vashi, Navi Mumbai',
    dateOfBirth: '1990-10-28'
  }
];

const sampleOrders = [
  {
    customerId: 1,
    orderNumber: 'ORD-001',
    status: 'completed',
    totalAmount: 450,
    tableNumber: 'T-01',
    orderType: 'dine-in',
    notes: 'Extra spicy'
  },
  {
    customerId: 2,
    orderNumber: 'ORD-002',
    status: 'completed',
    totalAmount: 320,
    tableNumber: 'T-05',
    orderType: 'dine-in',
    notes: 'No onions'
  },
  {
    customerId: 3,
    orderNumber: 'ORD-003',
    status: 'completed',
    totalAmount: 280,
    tableNumber: 'T-03',
    orderType: 'dine-in',
    notes: 'Mild spice'
  },
  {
    customerId: 4,
    orderNumber: 'ORD-004',
    status: 'completed',
    totalAmount: 380,
    tableNumber: 'T-07',
    orderType: 'dine-in',
    notes: 'Extra cheese'
  },
  {
    customerId: 5,
    orderNumber: 'ORD-005',
    status: 'completed',
    totalAmount: 520,
    tableNumber: 'T-02',
    orderType: 'dine-in',
    notes: 'Family order'
  },
  {
    customerId: 6,
    orderNumber: 'ORD-006',
    status: 'completed',
    totalAmount: 190,
    tableNumber: 'T-04',
    orderType: 'dine-in',
    notes: 'Single portion'
  },
  {
    customerId: 7,
    orderNumber: 'ORD-007',
    status: 'completed',
    totalAmount: 340,
    tableNumber: 'T-06',
    orderType: 'dine-in',
    notes: 'Takeaway'
  },
  {
    customerId: 8,
    orderNumber: 'ORD-008',
    status: 'completed',
    totalAmount: 410,
    tableNumber: 'T-08',
    orderType: 'dine-in',
    notes: 'Birthday celebration'
  },
  {
    customerId: 9,
    orderNumber: 'ORD-009',
    status: 'completed',
    totalAmount: 260,
    tableNumber: 'T-09',
    orderType: 'dine-in',
    notes: 'Quick lunch'
  },
  {
    customerId: 10,
    orderNumber: 'ORD-010',
    status: 'completed',
    totalAmount: 350,
    tableNumber: 'T-10',
    orderType: 'dine-in',
    notes: 'Business meeting'
  },
  {
    customerId: 1,
    orderNumber: 'ORD-011',
    status: 'pending',
    totalAmount: 180,
    tableNumber: 'T-01',
    orderType: 'dine-in',
    notes: 'Evening snack'
  },
  {
    customerId: 2,
    orderNumber: 'ORD-012',
    status: 'confirmed',
    totalAmount: 420,
    tableNumber: 'T-05',
    orderType: 'dine-in',
    notes: 'Dinner reservation'
  },
  {
    customerId: 3,
    orderNumber: 'ORD-013',
    status: 'preparing',
    totalAmount: 290,
    tableNumber: 'T-03',
    orderType: 'dine-in',
    notes: 'Special request'
  },
  {
    customerId: 4,
    orderNumber: 'ORD-014',
    status: 'ready',
    totalAmount: 330,
    tableNumber: 'T-07',
    orderType: 'dine-in',
    notes: 'Ready for pickup'
  },
  {
    customerId: 5,
    orderNumber: 'ORD-015',
    status: 'completed',
    totalAmount: 480,
    tableNumber: 'T-02',
    orderType: 'dine-in',
    notes: 'Weekend special'
  }
];

const sampleOrderItems = [
  // Order 1
  { orderId: 1, menuItemId: 1, qty: 2, price: 120 },
  { orderId: 1, menuItemId: 15, qty: 1, price: 80 },
  { orderId: 1, menuItemId: 30, qty: 2, price: 50 },
  { orderId: 1, menuItemId: 45, qty: 1, price: 30 },
  
  // Order 2
  { orderId: 2, menuItemId: 5, qty: 1, price: 150 },
  { orderId: 2, menuItemId: 20, qty: 1, price: 90 },
  { orderId: 2, menuItemId: 35, qty: 1, price: 80 },
  
  // Order 3
  { orderId: 3, menuItemId: 8, qty: 1, price: 180 },
  { orderId: 3, menuItemId: 25, qty: 1, price: 100 },
  
  // Order 4
  { orderId: 4, menuItemId: 12, qty: 2, price: 200 },
  { orderId: 4, menuItemId: 18, qty: 1, price: 90 },
  { orderId: 4, menuItemId: 40, qty: 1, price: 90 },
  
  // Order 5
  { orderId: 5, menuItemId: 3, qty: 1, price: 200 },
  { orderId: 5, menuItemId: 10, qty: 1, price: 120 },
  { orderId: 5, menuItemId: 22, qty: 1, price: 100 },
  { orderId: 5, menuItemId: 38, qty: 1, price: 100 },
  
  // Order 6
  { orderId: 6, menuItemId: 28, qty: 1, price: 80 },
  { orderId: 6, menuItemId: 42, qty: 1, price: 60 },
  { orderId: 6, menuItemId: 50, qty: 1, price: 50 },
  
  // Order 7
  { orderId: 7, menuItemId: 6, qty: 1, price: 160 },
  { orderId: 7, menuItemId: 16, qty: 1, price: 90 },
  { orderId: 7, menuItemId: 32, qty: 1, price: 90 },
  
  // Order 8
  { orderId: 8, menuItemId: 14, qty: 1, price: 180 },
  { orderId: 8, menuItemId: 24, qty: 1, price: 110 },
  { orderId: 8, menuItemId: 36, qty: 1, price: 120 },
  
  // Order 9
  { orderId: 9, menuItemId: 7, qty: 1, price: 140 },
  { orderId: 9, menuItemId: 26, qty: 1, price: 70 },
  { orderId: 9, menuItemId: 44, qty: 1, price: 50 },
  
  // Order 10
  { orderId: 10, menuItemId: 9, qty: 1, price: 170 },
  { orderId: 10, menuItemId: 19, qty: 1, price: 100 },
  { orderId: 10, menuItemId: 33, qty: 1, price: 80 },
  
  // Order 11
  { orderId: 11, menuItemId: 48, qty: 1, price: 60 },
  { orderId: 11, menuItemId: 52, qty: 1, price: 50 },
  { orderId: 11, menuItemId: 55, qty: 1, price: 70 },
  
  // Order 12
  { orderId: 12, menuItemId: 2, qty: 1, price: 180 },
  { orderId: 12, menuItemId: 11, qty: 1, price: 120 },
  { orderId: 12, menuItemId: 27, qty: 1, price: 120 },
  
  // Order 13
  { orderId: 13, menuItemId: 13, qty: 1, price: 160 },
  { orderId: 13, menuItemId: 29, qty: 1, price: 80 },
  { orderId: 13, menuItemId: 46, qty: 1, price: 50 },
  
  // Order 14
  { orderId: 14, menuItemId: 17, qty: 1, price: 150 },
  { orderId: 14, menuItemId: 31, qty: 1, price: 90 },
  { orderId: 14, menuItemId: 39, qty: 1, price: 90 },
  
  // Order 15
  { orderId: 15, menuItemId: 4, qty: 1, price: 200 },
  { orderId: 15, menuItemId: 21, qty: 1, price: 120 },
  { orderId: 15, menuItemId: 37, qty: 1, price: 100 },
  { orderId: 15, menuItemId: 49, qty: 1, price: 60 }
];

const sampleReviews = [
  {
    customerId: 1,
    orderId: 1,
    rating: 5,
    comment: 'Excellent food! The biryani was perfectly cooked and very flavorful. Will definitely come back.',
    foodRating: 5,
    serviceRating: 5,
    ambianceRating: 4,
    isVerified: true
  },
  {
    customerId: 2,
    orderId: 2,
    rating: 4,
    comment: 'Good food and quick service. The curry was delicious but could be a bit spicier.',
    foodRating: 4,
    serviceRating: 5,
    ambianceRating: 4,
    isVerified: true
  },
  {
    customerId: 3,
    orderId: 3,
    rating: 5,
    comment: 'Amazing experience! The staff was very friendly and the food was outstanding.',
    foodRating: 5,
    serviceRating: 5,
    ambianceRating: 5,
    isVerified: true
  },
  {
    customerId: 4,
    orderId: 4,
    rating: 4,
    comment: 'Great food quality and reasonable prices. The dessert was particularly good.',
    foodRating: 4,
    serviceRating: 4,
    ambianceRating: 4,
    isVerified: true
  },
  {
    customerId: 5,
    orderId: 5,
    rating: 5,
    comment: 'Perfect for family dining. Kids loved the food and the portion sizes were generous.',
    foodRating: 5,
    serviceRating: 5,
    ambianceRating: 4,
    isVerified: true
  },
  {
    customerId: 6,
    orderId: 6,
    rating: 3,
    comment: 'Food was okay but service was slow. The place was quite crowded.',
    foodRating: 3,
    serviceRating: 2,
    ambianceRating: 3,
    isVerified: false
  },
  {
    customerId: 7,
    orderId: 7,
    rating: 4,
    comment: 'Good value for money. The takeaway packaging was excellent.',
    foodRating: 4,
    serviceRating: 4,
    ambianceRating: 3,
    isVerified: true
  },
  {
    customerId: 8,
    orderId: 8,
    rating: 5,
    comment: 'Celebrated my birthday here and it was perfect! The staff made it special.',
    foodRating: 5,
    serviceRating: 5,
    ambianceRating: 5,
    isVerified: true
  },
  {
    customerId: 9,
    orderId: 9,
    rating: 4,
    comment: 'Quick and tasty lunch. The place is clean and well-maintained.',
    foodRating: 4,
    serviceRating: 4,
    ambianceRating: 4,
    isVerified: true
  },
  {
    customerId: 10,
    orderId: 10,
    rating: 5,
    comment: 'Professional service and excellent food. Perfect for business meetings.',
    foodRating: 5,
    serviceRating: 5,
    ambianceRating: 5,
    isVerified: true
  },
  {
    customerId: 1,
    orderId: 11,
    rating: 4,
    comment: 'Good evening snack options. The samosas were crispy and delicious.',
    foodRating: 4,
    serviceRating: 4,
    ambianceRating: 4,
    isVerified: false
  },
  {
    customerId: 2,
    orderId: 12,
    rating: 5,
    comment: 'Outstanding dinner experience. The chef really knows how to balance flavors.',
    foodRating: 5,
    serviceRating: 5,
    ambianceRating: 5,
    isVerified: true
  },
  {
    customerId: 3,
    orderId: 13,
    rating: 4,
    comment: 'Good food but had to wait a bit longer than expected.',
    foodRating: 4,
    serviceRating: 3,
    ambianceRating: 4,
    isVerified: false
  },
  {
    customerId: 4,
    orderId: 14,
    rating: 5,
    comment: 'Excellent quality and presentation. Highly recommended!',
    foodRating: 5,
    serviceRating: 5,
    ambianceRating: 4,
    isVerified: true
  },
  {
    customerId: 5,
    orderId: 15,
    rating: 4,
    comment: 'Great weekend special menu. Good variety and taste.',
    foodRating: 4,
    serviceRating: 4,
    ambianceRating: 4,
    isVerified: true
  }
];

async function seedSampleData() {
  try {
    console.log('Seeding sample customers...');
    await Customer.bulkCreate(sampleCustomers);
    
    console.log('Seeding sample orders...');
    await Order.bulkCreate(sampleOrders);
    
    console.log('Seeding sample order items...');
    await OrderItem.bulkCreate(sampleOrderItems);
    
    console.log('Seeding sample reviews...');
    await Review.bulkCreate(sampleReviews);
    
    console.log('✅ Sample data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding sample data:', error);
  }
}

module.exports = { seedSampleData };
