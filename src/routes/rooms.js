const express = require('express');
const router = express.Router();
const Room = require('../models/room.model');
const { auth, checkRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.getAll();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single room
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.getById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create room (Admin/Manager only)
router.post('/', auth, checkRole(['admin', 'manager']), upload.array('images'), async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => file.filename) : [];
    const room = await Room.create({
      ...req.body,
      images,
      availability: true
    });
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update room (Admin/Manager only)
router.put('/:id', auth, checkRole(['admin', 'manager']), upload.array('images'), async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => file.filename) : undefined;
    const room = await Room.update(req.params.id, {
      ...req.body,
      ...(images && { images })
    });
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete room (Admin/Manager only)
router.delete('/:id', auth, checkRole(['admin', 'manager']), async (req, res) => {
  try {
    await Room.delete(req.params.id);
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
