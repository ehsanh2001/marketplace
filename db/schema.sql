DROP DATABASE IF EXISTS marketplace_db;

CREATE DATABASE marketplace_db;
 \c marketplace_db;

CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE category (
    name VARCHAR(50) PRIMARY KEY,
    image BYTEA
);

CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY,
    password CHAR(60) NOT NULL,
    phone_email VARCHAR(60) NOT NULL,
    address VARCHAR(100) ,
    longitude DOUBLE PRECISION,
    latitude DOUBLE PRECISION,
    geo_location GEOGRAPHY(POINT, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) STORED
);

CREATE TABLE item(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    cat_name VARCHAR(50) NOT NULL REFERENCES category(name) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    price NUMERIC(10, 2) NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE image(
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES item(id) ON DELETE CASCADE,
    image BYTEA NOT NULL
);