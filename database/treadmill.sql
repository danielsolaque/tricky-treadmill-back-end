CREATE TABLE IF NOT EXISTS treadmills (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  category TEXT,
  brand TEXT,
  model TEXT,
  author TEXT,
  is_archive BOOLEAN,
  created_at TIMESTAMP
);