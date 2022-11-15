-- Use this file to define your SQL tables.
-- The SQL in this file will be executed when you run `npm run setup-db`.


DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL
);

INSERT INTO users (first_name, last_name, email, password_hash) VALUES
('Yes', 'Please', 'new@test.com', '$2b$10$zqW467eFg8VP70N6Yjnsu.hYTajilJ1JIApNuH5F5/eAFN71PFwvC'),
('Lyla', 'Birch', 'cultist@blades.com', 'fakePasswordHash');
