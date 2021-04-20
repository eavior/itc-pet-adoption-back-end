CREATE TABLE IF NOT EXISTS pets (
  id            VARCHAR(36) DEFAULT (UUID()),
  created       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  owner_id      VARCHAR(36),
  name          VARCHAR(200) NOT NULL,
  type          VARCHAR(100) NOT NULL,
  status        VARCHAR(100) NOT NULL DEFAULT 'Available',
  breed         VARCHAR(100),
  color         VARCHAR(100),
  height        INT,
  weight        INT,
  hypoallergenic  BOOLEAN,
  diet          VARCHAR(200),
  bio           VARCHAR(200),
  image         MEDIUMBLOB,
  PRIMARY KEY (id)
);