ALTER TABLE pets_db.saved_pets 
CHANGE COLUMN id id VARCHAR(36) NOT NULL DEFAULT (UUID()) ,
CHANGE COLUMN user_id user_id VARCHAR(36) NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (id);


