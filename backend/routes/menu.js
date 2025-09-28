const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { MenuItem } = require('../models');

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 200 } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = category ? { category } : {};
    
    const items = await MenuItem.findAndCountAll({
      where: whereClause,
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    res.json({
      items: items.rows,
      total: items.count,
      page: parseInt(page),
      pages: Math.ceil(items.count / limit)
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Failed to fetch menu items' });
  }
});

// Create new menu item
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').optional().isString().withMessage('Category must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ message: 'Failed to create menu item' });
  }
});

// Update menu item
router.put('/:id', [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').optional().isString().withMessage('Category must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const item = await MenuItem.findByPk(id);
    
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ message: 'Failed to update menu item' });
  }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByPk(id);
    
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await item.destroy();
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Failed to delete menu item' });
  }
});

module.exports = router;