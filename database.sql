CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- for uuid generation

CREATE DATABASE exampledb;

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);

CREATE TABLE developers (
    client_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    api_key TEXT NOT NULL UNIQUE
);