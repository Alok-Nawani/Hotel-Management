const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.model');
const { auth, checkRole } = require('../middleware/auth');

// Get all bookings (Admin/Manager/Staff only)
router.get('/', auth, checkRole(['admin', 'manager', 'staff']), async (req, res) => {
  try {
    const bookings = await Booking.getAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get customer's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.getByCustomerId(req.user.id);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      customer_id: req.user.id
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update booking status (Admin/Manager/Staff only)
router.patch('/:id/status', auth, checkRole(['admin', 'manager', 'staff']), async (req, res) => {
  try {
    const booking = await Booking.update(req.params.id, req.body.status);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel booking
router.delete('/:id', auth, async (req, res) => {
  try {
    // Only allow admin/manager or the booking owner to cancel
    const booking = await Booking.getById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (req.user.role !== 'admin' && req.user.role !== 'manager' && booking.customer_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    
    await Booking.delete(req.params.id);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
