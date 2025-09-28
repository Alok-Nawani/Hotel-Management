const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { Op } = require('sequelize');
const { Staff, sequelize } = require('../models');
const router = express.Router();

// Get all staff with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 100, 
      role, 
      isActive, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const whereClause = {};

    if (role) {
      whereClause.role = role;
    }

    if (isActive !== undefined) {
      whereClause.isActive = isActive === 'true';
    }

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows: staff } = await Staff.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        staff,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(count / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch staff',
      error: error.message
    });
  }
});

// Get staff by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findByPk(id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      data: staff
    });
  } catch (error) {
    console.error('Error fetching staff member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch staff member',
      error: error.message
    });
  }
});

// Create new staff member
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('phone').isLength({ min: 10, max: 15 }).withMessage('Phone must be 10-15 characters'),
  body('role').isIn(['chef', 'cook', 'waiter', 'manager', 'cashier', 'cleaner', 'security']).withMessage('Invalid role'),
  body('experience').isInt({ min: 0, max: 50 }).withMessage('Experience must be 0-50 years'),
  body('salary').isDecimal({ decimal_digits: '0,2' }).withMessage('Valid salary required'),
  body('dateOfBirth').optional().isISO8601().withMessage('Valid date required'),
  body('shift').optional().isIn(['morning', 'afternoon', 'evening', 'night']).withMessage('Invalid shift')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const staffData = req.body;
    const staff = await Staff.create(staffData);

    res.status(201).json({
      success: true,
      message: 'Staff member created successfully',
      data: staff
    });
  } catch (error) {
    console.error('Error creating staff member:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create staff member',
      error: error.message
    });
  }
});

// Update staff member
router.put('/:id', [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email required'),
  body('phone').optional().isLength({ min: 10, max: 15 }).withMessage('Phone must be 10-15 characters'),
  body('role').optional().isIn(['chef', 'cook', 'waiter', 'manager', 'cashier', 'cleaner', 'security']).withMessage('Invalid role'),
  body('experience').optional().isInt({ min: 0, max: 50 }).withMessage('Experience must be 0-50 years'),
  body('salary').optional().isDecimal({ decimal_digits: '0,2' }).withMessage('Valid salary required'),
  body('dateOfBirth').optional().isISO8601().withMessage('Valid date required'),
  body('shift').optional().isIn(['morning', 'afternoon', 'evening', 'night']).withMessage('Invalid shift')
], async (req, res) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const staff = await Staff.findByPk(id);
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    await staff.update(req.body);

    res.json({
      success: true,
      message: 'Staff member updated successfully',
      data: staff
    });
  } catch (error) {
    console.error('Error updating staff member:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update staff member',
      error: error.message
    });
  }
});

// Delete staff member (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findByPk(id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    await staff.update({ isActive: false });

    res.json({
      success: true,
      message: 'Staff member deactivated successfully'
    });
  } catch (error) {
    console.error('Error deactivating staff member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to deactivate staff member',
      error: error.message
    });
  }
});

// Get staff statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalStaff = await Staff.count();
    const activeStaff = await Staff.count({ where: { isActive: true } });
    
    const roleStats = await Staff.findAll({
      attributes: [
        'role',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['role'],
      raw: true
    });

    const experienceStats = await Staff.findAll({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('experience')), 'avgExperience'],
        [sequelize.fn('MAX', sequelize.col('experience')), 'maxExperience'],
        [sequelize.fn('MIN', sequelize.col('experience')), 'minExperience']
      ],
      where: { isActive: true },
      raw: true
    });

    res.json({
      success: true,
      data: {
        totalStaff,
        activeStaff,
        inactiveStaff: totalStaff - activeStaff,
        roleStats,
        experienceStats: experienceStats[0]
      }
    });
  } catch (error) {
    console.error('Error fetching staff statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch staff statistics',
      error: error.message
    });
  }
});

module.exports = router;
