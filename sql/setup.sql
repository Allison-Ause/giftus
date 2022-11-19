-- Use this file to define your SQL tables.
-- The SQL in this file will be executed when you run `npm run setup-db`.


DROP TABLE IF EXISTS users, gifts;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE gifts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  idea VARCHAR NOT NULL,
  link VARCHAR,
  price int,
  occasion VARCHAR,
  is_purchased BOOLEAN DEFAULT(false),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);



INSERT INTO users (first_name, last_name, email, password_hash) VALUES
('Bjorn', 'Doodle', 'dog@dog.com', '$2b$10$WL1aFvdcAtv6gSfqNtAjbeanOg0d8NED1FczWR4UOnZL86uj1U8DG'), --  password is password
('Lyla', 'Birch', 'cultist@blades.com', 'fakePasswordHash');

INSERT INTO gifts (user_id, idea, link, price, occasion) VALUES
(1, 'Ice Skates', 'url.link/buy', 45, 'Christmas'),
(1, 'Toadstool Lamp', 'url.link/shop', 25, 'Birthday'),
(1, 'Sword Umbrella', 'url.link/merchant', 70, 'Christmas');



-- isBought
-- createdAt