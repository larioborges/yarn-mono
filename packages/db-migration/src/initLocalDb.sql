CREATE DATABASE lariomono;
CREATE USER IF NOT EXISTS 'lariodev'@'localhost' IDENTIFIED BY 'lariopassword';
USE lariomono;
GRANT ALL PRIVILEGES ON lariomono.* TO lariodev@localhost;
FLUSH PRIVILEGES;
