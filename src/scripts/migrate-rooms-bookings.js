const db = require('../config/database');
const fs = require('fs').promises;
const path = require('path');

async function runMigration() {
  try {
    const sql = await fs.readFile(
      path.join(__dirname, '../migrations/rooms-bookings.sql'),
      'utf8'
    );

    const statements = sql.split(';').filter(statement => statement.trim());

    for (const statement of statements) {
      if (statement.trim()) {
        await db.query(statement);
        console.log('Executed:', statement.trim().split('\n')[0] + '...');
      }
    }

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
