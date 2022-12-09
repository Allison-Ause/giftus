-- Use this file to define your SQL tables.
-- The SQL in this file will be executed when you run `npm run setup-db`.


DROP TABLE IF EXISTS users, gifts, friends;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE friends (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  name VARCHAR NOT NULL UNIQUE,
  birthday DATE,
  address VARCHAR,
  FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE gifts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  idea VARCHAR NOT NULL,
  friend_id BIGINT,
  link VARCHAR,
  price int,
  occasion VARCHAR,
  is_purchased BOOLEAN DEFAULT(false),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (friend_id) references friends(id) ON DELETE CASCADE
);



--  password is password
INSERT INTO users (first_name, last_name, email, password_hash) VALUES
('Bjorn', 'Doodle', 'dog@dog.com', '$2b$10$WL1aFvdcAtv6gSfqNtAjbeanOg0d8NED1FczWR4UOnZL86uj1U8DG'), 
('Lyla', 'Birch', 'cultist@blades.com', 'fakePasswordHash');

INSERT INTO friends (user_id, name, birthday, address) VALUES
(1, 'Jenny', '1976-05-22', '29480 SW Volley St #22, Wilsonville OR 97070'),
(1, 'Katie', '1990-07-18', '14715 SW 84th Ct, Tigard OR 97223'),
(1, 'Jeremy Thompson', '1986-02-03', '4242 Heaven, Ashland OR 98223');

INSERT INTO gifts (user_id, idea, friend_id, link, price, occasion) VALUES
(1, 'Ice Skates', 1, 'https://www.powells.com/book/conditioning-for-figure-skating-9781570282201', 45, 'Christmas'),
(1, 'Raincoat', 1, 'https://www.blackdiamondequipment.com/en_US/product/stormline-stretch-rain-shell-womens/?colorid=11168', 270, 'Christmas'),
(1, 'Toadstool Lamp', 2, 'url.link/shop', 25, 'Birthday'),
(1, 'Sword Umbrella', 3, 'url.link/merchant', 70, 'Christmas');

