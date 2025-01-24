# Movies-review

## Base de donnes

```sql
CREATE TABLE users (
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


CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movie_title VARCHAR(255),
    review VARCHAR(255),
    rating Integer NOT NULL
);
```