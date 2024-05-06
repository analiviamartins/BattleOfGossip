CREATE DATABASE battleofgossip;

\c battleofgossip;

CREATE TABLE gossips(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level_of_gossip INT NOT NULL,
    level INT NOT NULL,
    hp INT NOT NULL,
    popularity VARCHAR(100) NOT NULL
);

CREATE TABLE battle (
    id SERIAL PRIMARY KEY,
    gossips1_id INT NOT NULL,
    gossips2_id INT NOT NULL,
    winner_id INT NOT NULL,
    FOREIGN KEY (gossips1_id) REFERENCES gossips(id),
    FOREIGN KEY (gossips2_id) REFERENCES gossips(id),
    FOREIGN KEY (winner_id) REFERENCES gossips(id)
);