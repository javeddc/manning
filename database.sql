
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS chats;


CREATE TABLE users(
  id SERIAL4 PRIMARY KEY,
  email VARCHAR(400) NOT NULL,
  password_digest TEXT NOT NULL
);

CREATE TABLE goals(
  id SERIAL4 PRIMARY KEY,
  user_id INTEGER,
  task VARCHAR(300),
  timeframe VARCHAR(100)
);

CREATE TABLE categories(
  id SERIAL4 PRIMARY KEY,
  name VARCHAR(30),
  image_url1 VARCHAR(400),
  image_url2 VARCHAR(400)
);

CREATE TABLE chats(
  id SERIAL4 PRIMARY KEY,
  body TEXT,
  user_id INTEGER,
  time_stamp TIMESTAMP,
  origin VARCHAR(9),
  buttons VARCHAR(400)
);

INSERT INTO chats(body, user_id, origin) VALUES ('Hey there.', 2, 'app');
INSERT INTO chats(body, user_id, origin) VALUES ('Hi', 2, 'user');
INSERT INTO chats(body, user_id, origin) VALUES ('Do you want to set some goals?', 2, 'app');
INSERT INTO chats(body, user_id, origin) VALUES ('Yes', 2, 'user');
INSERT INTO chats(body, user_id, origin, buttons) VALUES ('Long term or short term?', 2, 'app', '[Long term, Short term]');

INSERT INTO users(email, password_digest) VALUES ('travis', '$2a$10$fnUeAuOj5xkwko0jaZcvl.Kigt7IIRWUYkDD1U18juc26PakCIqM6');

INSERT INTO users(email, password_digest) VALUES ('travis@gmail.com', '$2a$10$BAjHnOldqts7gRGIy2G6S.AmUhRChvZ2npzK.GSQzgCpiojg7rImm');
