const db = require('../config/database');

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async findAll(options = {}) {
    const { where = {}, limit, offset, orderBy } = options;
    
    let query = `SELECT * FROM ${this.tableName}`;
    const values = [];

    // Add WHERE conditions
    const conditions = [];
    Object.entries(where).forEach(([key, value]) => {
      conditions.push(`${key} = ?`);
      values.push(value);
    });
    
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    // Add ORDER BY
    if (orderBy) {
      query += ` ORDER BY ${orderBy}`;
    }

    // Add LIMIT and OFFSET
    if (limit) {
      query += ` LIMIT ?`;
      values.push(limit);
      
      if (offset) {
        query += ` OFFSET ?`;
        values.push(offset);
      }
    }

    const [rows] = await db.query(query, values);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');

    const [result] = await db.query(
      `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`,
      values
    );
    return result.insertId;
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');

    await db.query(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
    return id;
  }

  async delete(id) {
    await db.query(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return id;
  }

  async transaction(callback) {
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = BaseModel;
