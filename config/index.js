const mysql = require('mysql2');

function createDBConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  });
}

let db = createDBConnection();

function handleDisconnect() {
  db.connect(function (err) {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      setTimeout(handleDisconnect, 5000); // Attempt to reconnect after 2 seconds
    } else {
      console.log(`Connected to ${process.env.DB_HOST}:${process.env.DB_PORT} MySQL database!`);
    }
  });

  db.on('error', function (err) {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Reconnect if connection is lost
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = db;
