MYSQL DB LOCAL SETUP
1. Install MySQL Server

2. Create local DB and development user: run the sql script in ./db/initLocalDb.sql as the root user
  Explanation of script:

  a.  Create a DB called xosports:
      SQL:
      CREATE DATABASE xosports;

  b.  Create a user for the localhost connection from the api-server to the DB. These credentials is what the local.env configuration is using.
      - Username: xosportsdev
      - Password: xosportspassword
      SQL:
      CREATE USER IF NOT EXISTS 'xosportsdev'@'localhost' IDENTIFIED BY 'xosportspassword';

  c.  Grant the user ALL PRIVILEGES to the xosports DB:
      SQL:
      USE xosports;
      GRANT ALL PRIVILEGES ON xosports.* TO xosportsdev@localhost;
      FLUSH PRIVILEGES;

3. Run the command "yarn migrate-up" to run the DB migrator to update the xosports DB to the latest schema

4. Run the command "yarn seed-up" to seed your DB with test data
