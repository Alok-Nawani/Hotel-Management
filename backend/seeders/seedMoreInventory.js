const { Inventory } = require('../models');

const additionalInventoryData = [
  // More Food Supplies
  { name: 'Basmati Rice (Premium)', category: 'food_supplies', currentStock: 50, minimumStock: 10, maximumStock: 100, unit: 'kg', unitPrice: 120, supplier: 'Premium Rice Co.', description: 'High quality basmati rice', isActive: true, alertEnabled: true },
  { name: 'Chicken (Fresh)', category: 'food_supplies', currentStock: 25, minimumStock: 5, maximumStock: 50, unit: 'kg', unitPrice: 200, supplier: 'Fresh Poultry', description: 'Fresh chicken pieces', isActive: true, alertEnabled: true },
  { name: 'Mutton (Fresh)', category: 'food_supplies', currentStock: 15, minimumStock: 3, maximumStock: 30, unit: 'kg', unitPrice: 400, supplier: 'Fresh Meat Co.', description: 'Fresh mutton pieces', isActive: true, alertEnabled: true },
  { name: 'Fish (Fresh)', category: 'food_supplies', currentStock: 20, minimumStock: 5, maximumStock: 40, unit: 'kg', unitPrice: 300, supplier: 'Ocean Fresh', description: 'Fresh fish', isActive: true, alertEnabled: true },
  { name: 'Paneer (Fresh)', category: 'food_supplies', currentStock: 30, minimumStock: 8, maximumStock: 60, unit: 'kg', unitPrice: 150, supplier: 'Dairy Fresh', description: 'Fresh paneer', isActive: true, alertEnabled: true },
  { name: 'Milk (Full Cream)', category: 'food_supplies', currentStock: 40, minimumStock: 10, maximumStock: 80, unit: 'liters', unitPrice: 60, supplier: 'Dairy Fresh', description: 'Full cream milk', isActive: true, alertEnabled: true },
  { name: 'Yogurt (Plain)', category: 'food_supplies', currentStock: 25, minimumStock: 5, maximumStock: 50, unit: 'kg', unitPrice: 80, supplier: 'Dairy Fresh', description: 'Plain yogurt', isActive: true, alertEnabled: true },
  { name: 'Cheese (Mozzarella)', category: 'food_supplies', currentStock: 20, minimumStock: 5, maximumStock: 40, unit: 'kg', unitPrice: 250, supplier: 'Cheese World', description: 'Mozzarella cheese', isActive: true, alertEnabled: true },
  { name: 'Butter (Unsalted)', category: 'food_supplies', currentStock: 15, minimumStock: 3, maximumStock: 30, unit: 'kg', unitPrice: 180, supplier: 'Dairy Fresh', description: 'Unsalted butter', isActive: true, alertEnabled: true },
  { name: 'Cream (Fresh)', category: 'food_supplies', currentStock: 20, minimumStock: 5, maximumStock: 40, unit: 'liters', unitPrice: 120, supplier: 'Dairy Fresh', description: 'Fresh cream', isActive: true, alertEnabled: true },

  // More Spices and Seasonings
  { name: 'Turmeric Powder', category: 'food_supplies', currentStock: 10, minimumStock: 2, maximumStock: 20, unit: 'kg', unitPrice: 200, supplier: 'Spice World', description: 'Pure turmeric powder', isActive: true, alertEnabled: true },
  { name: 'Cumin Seeds', category: 'food_supplies', currentStock: 8, minimumStock: 2, maximumStock: 15, unit: 'kg', unitPrice: 300, supplier: 'Spice World', description: 'Whole cumin seeds', isActive: true, alertEnabled: true },
  { name: 'Coriander Seeds', category: 'food_supplies', currentStock: 8, minimumStock: 2, maximumStock: 15, unit: 'kg', unitPrice: 250, supplier: 'Spice World', description: 'Whole coriander seeds', isActive: true, alertEnabled: true },
  { name: 'Cardamom (Green)', category: 'food_supplies', currentStock: 5, minimumStock: 1, maximumStock: 10, unit: 'kg', unitPrice: 800, supplier: 'Spice World', description: 'Green cardamom pods', isActive: true, alertEnabled: true },
  { name: 'Cinnamon Sticks', category: 'food_supplies', currentStock: 6, minimumStock: 1, maximumStock: 12, unit: 'kg', unitPrice: 400, supplier: 'Spice World', description: 'Cinnamon sticks', isActive: true, alertEnabled: true },
  { name: 'Cloves', category: 'food_supplies', currentStock: 4, minimumStock: 1, maximumStock: 8, unit: 'kg', unitPrice: 600, supplier: 'Spice World', description: 'Whole cloves', isActive: true, alertEnabled: true },
  { name: 'Bay Leaves', category: 'food_supplies', currentStock: 3, minimumStock: 1, maximumStock: 6, unit: 'kg', unitPrice: 500, supplier: 'Spice World', description: 'Dried bay leaves', isActive: true, alertEnabled: true },
  { name: 'Star Anise', category: 'food_supplies', currentStock: 3, minimumStock: 1, maximumStock: 6, unit: 'kg', unitPrice: 700, supplier: 'Spice World', description: 'Star anise', isActive: true, alertEnabled: true },
  { name: 'Fennel Seeds', category: 'food_supplies', currentStock: 6, minimumStock: 1, maximumStock: 12, unit: 'kg', unitPrice: 350, supplier: 'Spice World', description: 'Fennel seeds', isActive: true, alertEnabled: true },
  { name: 'Mustard Seeds', category: 'food_supplies', currentStock: 8, minimumStock: 2, maximumStock: 15, unit: 'kg', unitPrice: 200, supplier: 'Spice World', description: 'Black mustard seeds', isActive: true, alertEnabled: true },

  // More Vegetables
  { name: 'Onions (Red)', category: 'food_supplies', currentStock: 100, minimumStock: 20, maximumStock: 200, unit: 'kg', unitPrice: 30, supplier: 'Fresh Veggies', description: 'Red onions', isActive: true, alertEnabled: true },
  { name: 'Tomatoes (Fresh)', category: 'food_supplies', currentStock: 80, minimumStock: 15, maximumStock: 160, unit: 'kg', unitPrice: 40, supplier: 'Fresh Veggies', description: 'Fresh tomatoes', isActive: true, alertEnabled: true },
  { name: 'Potatoes (Fresh)', category: 'food_supplies', currentStock: 120, minimumStock: 25, maximumStock: 240, unit: 'kg', unitPrice: 25, supplier: 'Fresh Veggies', description: 'Fresh potatoes', isActive: true, alertEnabled: true },
  { name: 'Carrots (Fresh)', category: 'food_supplies', currentStock: 60, minimumStock: 12, maximumStock: 120, unit: 'kg', unitPrice: 35, supplier: 'Fresh Veggies', description: 'Fresh carrots', isActive: true, alertEnabled: true },
  { name: 'Capsicum (Green)', category: 'food_supplies', currentStock: 40, minimumStock: 8, maximumStock: 80, unit: 'kg', unitPrice: 60, supplier: 'Fresh Veggies', description: 'Green capsicum', isActive: true, alertEnabled: true },
  { name: 'Cauliflower (Fresh)', category: 'food_supplies', currentStock: 30, minimumStock: 6, maximumStock: 60, unit: 'kg', unitPrice: 45, supplier: 'Fresh Veggies', description: 'Fresh cauliflower', isActive: true, alertEnabled: true },
  { name: 'Cabbage (Fresh)', category: 'food_supplies', currentStock: 25, minimumStock: 5, maximumStock: 50, unit: 'kg', unitPrice: 30, supplier: 'Fresh Veggies', description: 'Fresh cabbage', isActive: true, alertEnabled: true },
  { name: 'Spinach (Fresh)', category: 'food_supplies', currentStock: 20, minimumStock: 4, maximumStock: 40, unit: 'kg', unitPrice: 50, supplier: 'Fresh Veggies', description: 'Fresh spinach', isActive: true, alertEnabled: true },
  { name: 'Coriander Leaves', category: 'food_supplies', currentStock: 15, minimumStock: 3, maximumStock: 30, unit: 'kg', unitPrice: 80, supplier: 'Fresh Veggies', description: 'Fresh coriander leaves', isActive: true, alertEnabled: true },
  { name: 'Mint Leaves', category: 'food_supplies', currentStock: 10, minimumStock: 2, maximumStock: 20, unit: 'kg', unitPrice: 100, supplier: 'Fresh Veggies', description: 'Fresh mint leaves', isActive: true, alertEnabled: true },

  // More Kitchen Equipment
  { name: 'Pressure Cooker (6L)', category: 'kitchen_equipment', currentStock: 8, minimumStock: 2, maximumStock: 15, unit: 'pieces', unitPrice: 2500, supplier: 'Kitchen Pro', description: '6 liter pressure cooker', isActive: true, alertEnabled: true },
  { name: 'Tawa (Large)', category: 'kitchen_equipment', currentStock: 12, minimumStock: 3, maximumStock: 20, unit: 'pieces', unitPrice: 800, supplier: 'Kitchen Pro', description: 'Large tawa for rotis', isActive: true, alertEnabled: true },
  { name: 'Kadhai (Heavy)', category: 'kitchen_equipment', currentStock: 10, minimumStock: 2, maximumStock: 18, unit: 'pieces', unitPrice: 1200, supplier: 'Kitchen Pro', description: 'Heavy bottom kadhai', isActive: true, alertEnabled: true },
  { name: 'Steamer (3 Tier)', category: 'kitchen_equipment', currentStock: 6, minimumStock: 1, maximumStock: 10, unit: 'pieces', unitPrice: 1800, supplier: 'Kitchen Pro', description: '3 tier steamer', isActive: true, alertEnabled: true },
  { name: 'Mixer Grinder (Heavy)', category: 'kitchen_equipment', currentStock: 4, minimumStock: 1, maximumStock: 8, unit: 'pieces', unitPrice: 3500, supplier: 'Kitchen Pro', description: 'Heavy duty mixer grinder', isActive: true, alertEnabled: true },
  { name: 'Food Processor', category: 'kitchen_equipment', currentStock: 3, minimumStock: 1, maximumStock: 6, unit: 'pieces', unitPrice: 4500, supplier: 'Kitchen Pro', description: 'Commercial food processor', isActive: true, alertEnabled: true },
  { name: 'Deep Freezer', category: 'kitchen_equipment', currentStock: 2, minimumStock: 1, maximumStock: 4, unit: 'pieces', unitPrice: 15000, supplier: 'Kitchen Pro', description: 'Commercial deep freezer', isActive: true, alertEnabled: true },
  { name: 'Refrigerator (Commercial)', category: 'kitchen_equipment', currentStock: 3, minimumStock: 1, maximumStock: 5, unit: 'pieces', unitPrice: 25000, supplier: 'Kitchen Pro', description: 'Commercial refrigerator', isActive: true, alertEnabled: true },

  // More Utensils
  { name: 'Serving Spoons (Large)', category: 'utensils', currentStock: 25, minimumStock: 5, maximumStock: 50, unit: 'pieces', unitPrice: 150, supplier: 'Utensil World', description: 'Large serving spoons', isActive: true, alertEnabled: true },
  { name: 'Ladles (Stainless)', category: 'utensils', currentStock: 30, minimumStock: 6, maximumStock: 60, unit: 'pieces', unitPrice: 120, supplier: 'Utensil World', description: 'Stainless steel ladles', isActive: true, alertEnabled: true },
  { name: 'Tongs (Kitchen)', category: 'utensils', currentStock: 20, minimumStock: 4, maximumStock: 40, unit: 'pieces', unitPrice: 100, supplier: 'Utensil World', description: 'Kitchen tongs', isActive: true, alertEnabled: true },
  { name: 'Strainers (Fine)', category: 'utensils', currentStock: 15, minimumStock: 3, maximumStock: 30, unit: 'pieces', unitPrice: 80, supplier: 'Utensil World', description: 'Fine mesh strainers', isActive: true, alertEnabled: true },
  { name: 'Cutting Boards (Large)', category: 'utensils', currentStock: 12, minimumStock: 2, maximumStock: 20, unit: 'pieces', unitPrice: 300, supplier: 'Utensil World', description: 'Large cutting boards', isActive: true, alertEnabled: true },
  { name: 'Knives (Chef)', category: 'utensils', currentStock: 18, minimumStock: 3, maximumStock: 35, unit: 'pieces', unitPrice: 500, supplier: 'Utensil World', description: 'Chef knives', isActive: true, alertEnabled: true },
  { name: 'Peelers (Vegetable)', category: 'utensils', currentStock: 20, minimumStock: 4, maximumStock: 40, unit: 'pieces', unitPrice: 50, supplier: 'Utensil World', description: 'Vegetable peelers', isActive: true, alertEnabled: true },
  { name: 'Graters (Multi)', category: 'utensils', currentStock: 15, minimumStock: 3, maximumStock: 30, unit: 'pieces', unitPrice: 200, supplier: 'Utensil World', description: 'Multi-purpose graters', isActive: true, alertEnabled: true },

  // More Cleaning Supplies
  { name: 'Dish Soap (Commercial)', category: 'cleaning_supplies', currentStock: 20, minimumStock: 5, maximumStock: 40, unit: 'liters', unitPrice: 150, supplier: 'Clean Pro', description: 'Commercial dish soap', isActive: true, alertEnabled: true },
  { name: 'Floor Cleaner', category: 'cleaning_supplies', currentStock: 15, minimumStock: 3, maximumStock: 30, unit: 'liters', unitPrice: 200, supplier: 'Clean Pro', description: 'Floor cleaning solution', isActive: true, alertEnabled: true },
  { name: 'Sanitizer (Kitchen)', category: 'cleaning_supplies', currentStock: 25, minimumStock: 5, maximumStock: 50, unit: 'liters', unitPrice: 300, supplier: 'Clean Pro', description: 'Kitchen sanitizer', isActive: true, alertEnabled: true },
  { name: 'Scrub Pads (Heavy)', category: 'cleaning_supplies', currentStock: 50, minimumStock: 10, maximumStock: 100, unit: 'pieces', unitPrice: 25, supplier: 'Clean Pro', description: 'Heavy duty scrub pads', isActive: true, alertEnabled: true },
  { name: 'Microfiber Cloths', category: 'cleaning_supplies', currentStock: 40, minimumStock: 8, maximumStock: 80, unit: 'pieces', unitPrice: 30, supplier: 'Clean Pro', description: 'Microfiber cleaning cloths', isActive: true, alertEnabled: true },
  { name: 'Sponges (Kitchen)', category: 'cleaning_supplies', currentStock: 60, minimumStock: 12, maximumStock: 120, unit: 'pieces', unitPrice: 15, supplier: 'Clean Pro', description: 'Kitchen sponges', isActive: true, alertEnabled: true },
  { name: 'Trash Bags (Large)', category: 'cleaning_supplies', currentStock: 100, minimumStock: 20, maximumStock: 200, unit: 'pieces', unitPrice: 5, supplier: 'Clean Pro', description: 'Large trash bags', isActive: true, alertEnabled: true },
  { name: 'Disinfectant Spray', category: 'cleaning_supplies', currentStock: 30, minimumStock: 6, maximumStock: 60, unit: 'pieces', unitPrice: 80, supplier: 'Clean Pro', description: 'Disinfectant spray bottles', isActive: true, alertEnabled: true },

  // More Electronics
  { name: 'POS Terminal', category: 'electronics', currentStock: 3, minimumStock: 1, maximumStock: 5, unit: 'pieces', unitPrice: 15000, supplier: 'Tech Solutions', description: 'Point of sale terminal', isActive: true, alertEnabled: true },
  { name: 'Barcode Scanner', category: 'electronics', currentStock: 5, minimumStock: 1, maximumStock: 8, unit: 'pieces', unitPrice: 2500, supplier: 'Tech Solutions', description: 'Barcode scanner', isActive: true, alertEnabled: true },
  { name: 'Cash Register', category: 'electronics', currentStock: 2, minimumStock: 1, maximumStock: 4, unit: 'pieces', unitPrice: 8000, supplier: 'Tech Solutions', description: 'Electronic cash register', isActive: true, alertEnabled: true },
  { name: 'Security Camera', category: 'electronics', currentStock: 8, minimumStock: 2, maximumStock: 15, unit: 'pieces', unitPrice: 3000, supplier: 'Tech Solutions', description: 'Security camera', isActive: true, alertEnabled: true },
  { name: 'WiFi Router', category: 'electronics', currentStock: 2, minimumStock: 1, maximumStock: 4, unit: 'pieces', unitPrice: 2000, supplier: 'Tech Solutions', description: 'WiFi router', isActive: true, alertEnabled: true },
  { name: 'Printer (Receipt)', category: 'electronics', currentStock: 3, minimumStock: 1, maximumStock: 5, unit: 'pieces', unitPrice: 1500, supplier: 'Tech Solutions', description: 'Receipt printer', isActive: true, alertEnabled: true },
  { name: 'Calculator (Desktop)', category: 'electronics', currentStock: 4, minimumStock: 1, maximumStock: 6, unit: 'pieces', unitPrice: 500, supplier: 'Tech Solutions', description: 'Desktop calculator', isActive: true, alertEnabled: true },
  { name: 'Extension Board', category: 'electronics', currentStock: 10, minimumStock: 2, maximumStock: 20, unit: 'pieces', unitPrice: 200, supplier: 'Tech Solutions', description: 'Power extension board', isActive: true, alertEnabled: true },

  // More Furniture
  { name: 'Dining Table (4 Seater)', category: 'furniture', currentStock: 15, minimumStock: 3, maximumStock: 25, unit: 'pieces', unitPrice: 8000, supplier: 'Furniture World', description: '4 seater dining table', isActive: true, alertEnabled: true },
  { name: 'Dining Table (6 Seater)', category: 'furniture', currentStock: 10, minimumStock: 2, maximumStock: 18, unit: 'pieces', unitPrice: 12000, supplier: 'Furniture World', description: '6 seater dining table', isActive: true, alertEnabled: true },
  { name: 'Dining Table (8 Seater)', category: 'furniture', currentStock: 8, minimumStock: 1, maximumStock: 12, unit: 'pieces', unitPrice: 15000, supplier: 'Furniture World', description: '8 seater dining table', isActive: true, alertEnabled: true },
  { name: 'Dining Chairs (Wooden)', category: 'furniture', currentStock: 60, minimumStock: 12, maximumStock: 100, unit: 'pieces', unitPrice: 1500, supplier: 'Furniture World', description: 'Wooden dining chairs', isActive: true, alertEnabled: true },
  { name: 'Dining Chairs (Upholstered)', category: 'furniture', currentStock: 40, minimumStock: 8, maximumStock: 70, unit: 'pieces', unitPrice: 2500, supplier: 'Furniture World', description: 'Upholstered dining chairs', isActive: true, alertEnabled: true },
  { name: 'Bar Stools', category: 'furniture', currentStock: 20, minimumStock: 4, maximumStock: 35, unit: 'pieces', unitPrice: 3000, supplier: 'Furniture World', description: 'Bar height stools', isActive: true, alertEnabled: true },
  { name: 'Side Tables', category: 'furniture', currentStock: 12, minimumStock: 2, maximumStock: 20, unit: 'pieces', unitPrice: 2000, supplier: 'Furniture World', description: 'Side tables', isActive: true, alertEnabled: true },
  { name: 'Display Cabinet', category: 'furniture', currentStock: 6, minimumStock: 1, maximumStock: 10, unit: 'pieces', unitPrice: 12000, supplier: 'Furniture World', description: 'Display cabinet', isActive: true, alertEnabled: true },

  // More Decorations
  { name: 'Table Lamps', category: 'decorations', currentStock: 20, minimumStock: 4, maximumStock: 35, unit: 'pieces', unitPrice: 800, supplier: 'Decor World', description: 'Table lamps', isActive: true, alertEnabled: true },
  { name: 'Wall Art (Framed)', category: 'decorations', currentStock: 15, minimumStock: 3, maximumStock: 25, unit: 'pieces', unitPrice: 1200, supplier: 'Decor World', description: 'Framed wall art', isActive: true, alertEnabled: true },
  { name: 'Plants (Indoor)', category: 'decorations', currentStock: 25, minimumStock: 5, maximumStock: 45, unit: 'pieces', unitPrice: 300, supplier: 'Decor World', description: 'Indoor plants', isActive: true, alertEnabled: true },
  { name: 'Candles (Decorative)', category: 'decorations', currentStock: 50, minimumStock: 10, maximumStock: 100, unit: 'pieces', unitPrice: 50, supplier: 'Decor World', description: 'Decorative candles', isActive: true, alertEnabled: true },
  { name: 'Vases (Ceramic)', category: 'decorations', currentStock: 18, minimumStock: 3, maximumStock: 30, unit: 'pieces', unitPrice: 400, supplier: 'Decor World', description: 'Ceramic vases', isActive: true, alertEnabled: true },
  { name: 'Curtains (Window)', category: 'decorations', currentStock: 12, minimumStock: 2, maximumStock: 20, unit: 'pieces', unitPrice: 1500, supplier: 'Decor World', description: 'Window curtains', isActive: true, alertEnabled: true },
  { name: 'Rugs (Decorative)', category: 'decorations', currentStock: 8, minimumStock: 1, maximumStock: 15, unit: 'pieces', unitPrice: 2000, supplier: 'Decor World', description: 'Decorative rugs', isActive: true, alertEnabled: true },
  { name: 'Mirrors (Wall)', category: 'decorations', currentStock: 10, minimumStock: 2, maximumStock: 18, unit: 'pieces', unitPrice: 800, supplier: 'Decor World', description: 'Wall mirrors', isActive: true, alertEnabled: true },

  // More Maintenance Items
  { name: 'Light Bulbs (LED)', category: 'maintenance', currentStock: 30, minimumStock: 6, maximumStock: 60, unit: 'pieces', unitPrice: 100, supplier: 'Maintenance Pro', description: 'LED light bulbs', isActive: true, alertEnabled: true },
  { name: 'Fuses (Electrical)', category: 'maintenance', currentStock: 50, minimumStock: 10, maximumStock: 100, unit: 'pieces', unitPrice: 25, supplier: 'Maintenance Pro', description: 'Electrical fuses', isActive: true, alertEnabled: true },
  { name: 'Screws (Assorted)', category: 'maintenance', currentStock: 200, minimumStock: 40, maximumStock: 400, unit: 'pieces', unitPrice: 2, supplier: 'Maintenance Pro', description: 'Assorted screws', isActive: true, alertEnabled: true },
  { name: 'Nails (Assorted)', category: 'maintenance', currentStock: 300, minimumStock: 60, maximumStock: 600, unit: 'pieces', unitPrice: 1, supplier: 'Maintenance Pro', description: 'Assorted nails', isActive: true, alertEnabled: true },
  { name: 'Tape (Electrical)', category: 'maintenance', currentStock: 20, minimumStock: 4, maximumStock: 40, unit: 'rolls', unitPrice: 50, supplier: 'Maintenance Pro', description: 'Electrical tape', isActive: true, alertEnabled: true },
  { name: 'Wire (Electrical)', category: 'maintenance', currentStock: 100, minimumStock: 20, maximumStock: 200, unit: 'meters', unitPrice: 15, supplier: 'Maintenance Pro', description: 'Electrical wire', isActive: true, alertEnabled: true },
  { name: 'Paint (White)', category: 'maintenance', currentStock: 10, minimumStock: 2, maximumStock: 20, unit: 'liters', unitPrice: 300, supplier: 'Maintenance Pro', description: 'White paint', isActive: true, alertEnabled: true },
  { name: 'Brushes (Paint)', category: 'maintenance', currentStock: 15, minimumStock: 3, maximumStock: 30, unit: 'pieces', unitPrice: 80, supplier: 'Maintenance Pro', description: 'Paint brushes', isActive: true, alertEnabled: true }
];

async function seedMoreInventory() {
  try {
    console.log('🌱 Seeding additional inventory data...');
    
    for (const inventoryData of additionalInventoryData) {
      await Inventory.create(inventoryData);
    }
    
    console.log(`✅ Successfully seeded ${additionalInventoryData.length} additional inventory items`);
  } catch (error) {
    console.error('❌ Error seeding additional inventory:', error);
  }
}

module.exports = { seedMoreInventory };
