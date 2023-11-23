-- пользователь

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  surname VARCHAR(255),
  patronymic VARCHAR(255) DEFAULT null,
  login VARCHAR(255),
  email VARCHAR(255),
  role_id INT DEFAULT 1,
  password VARCHAR(255)

  FOREIGN KEY (role_id) REFERENCES role (id)
);

INSERT INTO category (name) values ("лазерные принтеры", "струйные принтеры", "термопринтеры")

-- товар

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  date VARCHAR(255),
  date_creation VARCHAR(255) DEFAULT null,
  model VARCHAR(255),
  price INT,
  gallery TEXT,
  category_id INT,
  count INT DEFAULT 0,
  country VARCHAR(255),

  FOREIGN KEY (category_id) REFERENCES category (id)
);

-- заказ

CREATE TABLE order (
  id SERIAL PRIMARY KEY,
  date VARCHAR(255),
  products TEXT,
  order_status_id INT DEFAULT 1,
  message TEXT,
  user_id INT,

  FOREIGN KEY (user_id) REFERENCES users (id)
);