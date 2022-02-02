MYSQL DB LOCAL SETUP
1. Install MySQL Server

2. Create local DB and development user: run the sql script in ./db/initLocalDb.sql as the root user
  Explanation of script:

  a.  Create a DB called xosports:
      SQL:
      CREATE DATABASE xosports;

  b.  Create a user for the localhost connection from the api-server to the DB (see sql script in repo)

3. Run the command "yarn migrate-up" to run the DB migrator to update the xosports DB to the latest schema

4. Run the command "yarn seed-up" to seed your DB with test data
