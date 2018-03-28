-- create pokemons table
CREATE TABLE IF NOT EXISTS pokemons (
  id SERIAL PRIMARY KEY,
  num varchar(255),
  name varchar(255),
  img varchar(255),
  weight varchar(255),
  height varchar(255)
);

-- create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  email varchar(255),
  password varchar(255)
);


-- create join TABLE
CREATE TABLE IF NOT EXISTS user_pokemons (
  id serial primary key,
  pokemon_id integer,
  user_id integer,
  created_at timestamp
);
