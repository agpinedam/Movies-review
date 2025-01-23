-- Create the 'users' table if it doesn't already exist
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    about TEXT,
    photo VARCHAR(255),
    phone VARCHAR(15),
    accept_terms BOOLEAN NOT NULL
);

-- Insert a user into the 'users' table
INSERT INTO users (email, password, name, surname, about, photo, phone, accept_terms) 
VALUES (
    'john.doe@example.com', 
    'securepassword123', 
    'John', 
    'Doe', 
    'A software developer with a passion for creating innovative solutions.', 
    'john_doe.jpg', 
    '+1234567890', 
    true
);

-- Create the 'review' table if it doesn't already exist
CREATE TABLE IF NOT EXISTS review (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movie_title VARCHAR(255),
    review TEXT,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5) -- Ensure rating is between 1 and 5
);
