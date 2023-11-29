CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- for uuid generation

CREATE DATABASE exampledb;

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);

SELECT * FROM users;


-- Don't actually insert them like this. The user's password won't work with auth b/c encryption
    -- INSERT INTO users (user_name,user_email,user_password) 
    --       VALUES ('John Doe', 'johndoe@email.com', 'supersecretpassword');



-- login to postgres db                 psql -U <username>
-- list dbs                             \l
-- connect to a specific database       \c <db-name>
-- list tables                          \dt
