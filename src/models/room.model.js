const db = require('../config/database');

const Room = {
  create: async (room) => {
    const { room_number, type, floor, price, capacity, amenities, description, status, images } = room;
    const [result] = await db.query(
      `INSERT INTO rooms (
        room_number, type, floor, price, capacity, amenities, 
        description, status, images
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        room_number, type, floor, price, capacity, 
        JSON.stringify(amenities), description, status || 'available',
        JSON.stringify(images)
      ]
    );
    return result.insertId;
  },

  getAll: async () => {
    const [rows] = await db.query(`
      SELECT r.*, rt.name as type_name, rt.features
      FROM rooms r
      LEFT JOIN room_types rt ON r.type = rt.name
    `);
    return rows.map(row => ({
      ...row,
      images: JSON.parse(row.images || '[]'),
      amenities: JSON.parse(row.amenities || '[]'),
      features: JSON.parse(row.features || '[]')
    }));
  },

  findAvailable: async (checkIn, checkOut) => {
    const [rows] = await db.query(`
      SELECT r.*, rt.name as type_name, rt.features 
      FROM rooms r
      LEFT JOIN room_types rt ON r.type = rt.name
      WHERE r.room_id NOT IN (
        SELECT b.room_id
        FROM bookings b
        WHERE b.booking_status NOT IN ('cancelled', 'checked_out')
        AND (
          (b.check_in_date <= ? AND b.check_out_date >= ?)
          OR (b.check_in_date <= ? AND b.check_out_date >= ?)
          OR (b.check_in_date >= ? AND b.check_out_date <= ?)
        )
      )
      AND r.status = 'available'
    `, [checkOut, checkOut, checkIn, checkIn, checkIn, checkOut]);
    
    return rows.map(row => ({
      ...row,
      images: JSON.parse(row.images || '[]'),
      amenities: JSON.parse(row.amenities || '[]'),
      features: JSON.parse(row.features || '[]')
    }));
  },

  getById: async (id) => {
    const [rows] = await db.query(`
      SELECT r.*, rt.name as type_name, rt.features,
        (SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'booking_id', b.booking_id,
            'check_in_date', b.check_in_date,
            'check_out_date', b.check_out_date,
            'booking_status', b.booking_status,
            'customer_name', u.name
          )
        )
        FROM bookings b
        LEFT JOIN users u ON b.customer_id = u.user_id
        WHERE b.room_id = r.room_id
        AND b.booking_status NOT IN ('cancelled', 'checked_out')
      ) as upcoming_bookings
      FROM rooms r
      LEFT JOIN room_types rt ON r.type = rt.name
      WHERE r.room_id = ?
    `, [id]);
    
    if (rows.length === 0) return null;
    
    const room = rows[0];
    return {
      ...room,
      images: JSON.parse(room.images || '[]'),
      amenities: JSON.parse(room.amenities || '[]'),
      features: JSON.parse(room.features || '[]'),
      upcoming_bookings: JSON.parse(room.upcoming_bookings || '[]')
    };
  },

  update: async (id, room) => {
    const { room_number, type, floor, price, capacity, amenities, description, status, images } = room;
    await db.query(
      `UPDATE rooms SET 
        room_number = ?, type = ?, floor = ?, price = ?, 
        capacity = ?, amenities = ?, description = ?, 
        status = ?, images = ?
      WHERE room_id = ?`,
      [
        room_number, type, floor, price, capacity,
        JSON.stringify(amenities), description, status,
        JSON.stringify(images), id
      ]
    );
    return id;
  },

  updateStatus: async (id, status) => {
    await db.query(
      'UPDATE rooms SET status = ? WHERE room_id = ?',
      [status, id]
    );
    return id;
  },

  delete: async (id) => {
    await db.query('DELETE FROM rooms WHERE room_id = ?', [id]);
    return id;
  },

  getOccupancyStats: async () => {
    const [rows] = await db.query(`
      SELECT 
        status,
        COUNT(*) as count,
        ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM rooms)), 2) as percentage
      FROM rooms
      GROUP BY status
    `);
    return rows;
  },

  getByFloor: async (floor) => {
    const [rows] = await db.query(
      'SELECT * FROM rooms WHERE floor = ?',
      [floor]
    );
    return rows.map(row => ({
      ...row,
      images: JSON.parse(row.images || '[]'),
      amenities: JSON.parse(row.amenities || '[]')
    }));
  },

  getByType: async (type) => {
    const [rows] = await db.query(
      'SELECT * FROM rooms WHERE type = ?',
      [type]
    );
    return rows.map(row => ({
      ...row,
      images: JSON.parse(row.images || '[]'),
      amenities: JSON.parse(row.amenities || '[]')
    }));
  }
};

module.exports = Room;
