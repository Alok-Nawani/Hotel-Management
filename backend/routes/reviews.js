const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { Op } = require('sequelize');
const { Review, Customer, Order, sequelize } = require('../models');
const router = express.Router();

// Get all reviews with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      rating,
      isVerified,
      customerId,
      orderId,
      search
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = { isActive: true };

    // Apply filters
    if (rating) {
      whereClause.rating = rating;
    }
    if (isVerified !== undefined) {
      whereClause.isVerified = isVerified === 'true';
    }
    if (customerId) {
      whereClause.customerId = customerId;
    }
    if (orderId) {
      whereClause.orderId = orderId;
    }
    if (search) {
      whereClause[Op.or] = [
        { comment: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows: reviews } = await Review.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Customer,
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: Order,
          attributes: ['id', 'tableNumber', 'total', 'status']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
      error: error.message
    });
  }
});

// Get review by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id, {
      include: [
        {
          model: Customer,
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: Order,
          attributes: ['id', 'tableNumber', 'total', 'status']
        }
      ]
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      data: { review }
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch review',
      error: error.message
    });
  }
});

// Create new review
router.post('/', [
  body('customerId').isInt().withMessage('Customer ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isString().withMessage('Comment must be a string'),
  body('foodRating').optional().isInt({ min: 1, max: 5 }).withMessage('Food rating must be between 1 and 5'),
  body('serviceRating').optional().isInt({ min: 1, max: 5 }).withMessage('Service rating must be between 1 and 5'),
  body('ambianceRating').optional().isInt({ min: 1, max: 5 }).withMessage('Ambiance rating must be between 1 and 5'),
  body('orderId').optional().isInt().withMessage('Order ID must be an integer')
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

    const reviewData = req.body;
    const review = await Review.create(reviewData);

    const reviewWithAssociations = await Review.findByPk(review.id, {
      include: [
        {
          model: Customer,
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: Order,
          attributes: ['id', 'tableNumber', 'total', 'status']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: { review: reviewWithAssociations }
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create review',
      error: error.message
    });
  }
});

// Update review
router.put('/:id', [
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isString().withMessage('Comment must be a string'),
  body('foodRating').optional().isInt({ min: 1, max: 5 }).withMessage('Food rating must be between 1 and 5'),
  body('serviceRating').optional().isInt({ min: 1, max: 5 }).withMessage('Service rating must be between 1 and 5'),
  body('ambianceRating').optional().isInt({ min: 1, max: 5 }).withMessage('Ambiance rating must be between 1 and 5'),
  body('isVerified').optional().isBoolean().withMessage('isVerified must be a boolean')
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

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    await review.update(req.body);

    const updatedReview = await Review.findByPk(id, {
      include: [
        {
          model: Customer,
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: Order,
          attributes: ['id', 'tableNumber', 'total', 'status']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: { review: updatedReview }
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update review',
      error: error.message
    });
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    await review.update({ isActive: false });

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete review',
      error: error.message
    });
  }
});

// Get review statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalReviews = await Review.count({
      where: { isActive: true }
    });

    const verifiedReviews = await Review.count({
      where: { isActive: true, isVerified: true }
    });

    const averageRating = await Review.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']
      ],
      where: { isActive: true },
      raw: true
    });

    const ratingDistribution = await Review.findAll({
      attributes: [
        'rating',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['rating'],
      order: [['rating', 'ASC']],
      raw: true
    });

    const recentReviews = await Review.findAll({
      where: { isActive: true },
      include: [
        {
          model: Customer,
          attributes: ['id', 'name']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    res.json({
      success: true,
      data: {
        totalReviews,
        verifiedReviews,
        averageRating: parseFloat(averageRating.avgRating || 0).toFixed(2),
        ratingDistribution,
        recentReviews
      }
    });
  } catch (error) {
    console.error('Error fetching review statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch review statistics',
      error: error.message
    });
  }
});

module.exports = router;
