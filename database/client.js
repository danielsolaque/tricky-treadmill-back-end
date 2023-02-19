const { Client } = require("pg");

const db = new Client({
  user: process.env.USER_DB,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
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
        is_archive BOOLEAN,
        created_at TIMESTAMP
      );`
    )
  )
  .then(() => console.log("All good"))
  .catch((err) => console.log(err));

module.exports = db;
