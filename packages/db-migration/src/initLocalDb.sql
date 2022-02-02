CREATE DATABASE xosports;
CREATE USER IF NOT EXISTS 'xosportsdev'@'localhost' IDENTIFIED BY 'xosportspassword';
USE xosports;
GRANT ALL PRIVILEGES ON xosports.* TO xosportsdev@localhost;
FLUSH PRIVILEGES;
