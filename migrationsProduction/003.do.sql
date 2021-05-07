CREATE TABLE IF NOT EXISTS saved_pets (
  id                 VARCHAR(36) DEFAULT (UUID()),
  user_id            VARCHAR(36),
  pet_id             VARCHAR(36),
  PRIMARY KEY (id)
);
