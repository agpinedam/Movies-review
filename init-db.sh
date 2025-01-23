#!/bin/bash

# Wait for PostgreSQL to be fully initialized and ready
until pg_isready -h localhost -U "$POSTGRES_USER"; do
  echo "Waiting for PostgreSQL to become ready..."
  sleep 2
done

# Créer une table 'users' si elle n'existe pas
psql -U $POSTGRES_USER -d $POSTGRES_DB << EOF
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    about TEXT,
    photo VARCHAR(255),
    phone VARCHAR(15),
    address VARCHAR(255),
    accept_terms BOOLEAN NOT NULL
);

-- Créer une table 'review' si elle n'existe pas
CREATE TABLE IF NOT EXISTS review (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movie_title VARCHAR(255),
    review VARCHAR(255),
    rating INTEGER NOT NULL
);

EOF
