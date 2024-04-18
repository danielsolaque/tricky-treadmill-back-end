const { Client } = require("pg");

const db = new Client({
  user: process.env.USER_DB,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PG_PORT,
  database: process.env.DATABASE,
});

// Inicialización de la base de datos
db.connect()
  .then(() =>
    db.query(
      `CREATE TABLE IF NOT EXISTS treadmills (
        id SERIAL PRIMARY KEY,
        title TEXT,
        description TEXT,
        category TEXT,
        brand TEXT,
        model TEXT,
        author TEXT,
        thumbnail_url TEXT,
        is_archive BOOLEAN,
        created_at TIMESTAMP
      );`
    )
  )
  .then(() => console.log("Database is properly connected"))
  .catch((err) => console.log("Error connecting databse", err));

module.exports = db;
