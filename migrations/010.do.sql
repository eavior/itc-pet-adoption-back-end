ALTER TABLE users DROP COLUMN admin;
INSERT INTO users (email, password_hash, role, first_name, last_name, phone_number) VALUES ('admin@admin.com', 'admin', 'admin', 'default', 'admin', '000000000');