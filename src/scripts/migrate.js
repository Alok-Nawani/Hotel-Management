const db = require('../config/database');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

async function runMigration() {
  try {
    console.log('Starting database migration...');
    
    const sql = await fs.readFile(
      path.join(__dirname, '../migrations/init.sql'),
      'utf8'
    );

    const statements = sql
      .split(';')
      .filter(statement => statement.trim())
      .map(statement => statement.trim());

    for (const statement of statements) {
      try {
        await db.query(statement);
        console.log('Executed:', statement.split('\n')[0] + '...');
      } catch (error) {
        console.error('Error executing statement:', statement.split('\n')[0]);
        console.error('Error details:', error);
        throw error;
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
