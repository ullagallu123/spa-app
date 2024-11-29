require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'crud_app'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit();
  }
  console.log('Connected to the MySQL database.');
});

module.exports = db;
