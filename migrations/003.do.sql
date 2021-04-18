CREATE TABLE IF NOT EXISTS users (
  id                 VARCHAR(36) DEFAULT (UUID()),
  created            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated            TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  email              VARCHAR(255) NOT NULL UNIQUE,
  password_hash      VARCHAR(255) NOT NULL,
  first_name         VARCHAR(255) NOT NULL,
  last_name          VARCHAR(255) NOT NULL,
  phone_number       VARCHAR(20) NOT NULL,
  bio                TEXT,
  admin              BOOLEAN,
  PRIMARY KEY (id)
);


