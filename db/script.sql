CREATE DATABASE battleofgossip;

\c battleofgossip;

CREATE TABLE gossips(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    level_of_gossip INT NOT NULL,
    elenco VARCHAR(100) NOT NULL,
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

INSERT INTO gossips (nome, level_of_gossip, elenco, hp, popularity) VALUES ('Serena Celia Van Der Woodsen', 5, 'Principal', 8, 'Popular'),
                            ('Blair Cornelia Waldorf Bass', 8, 'Principal', 6, 'Popular'),
                            ('Daniel Randolph Humphrey', 4, 'Principal', 7, 'Popular'),
                            ('Charles Bartholomew Bass', 9, 'Principal', 8, 'Popular'),
                            ('Nathaniel Archibald VanderBilt', 3, 'Principal', 4, 'Popular'),
                            ('Jenny Humphrey', 8, 'Principal', 8, 'Popular'),
                            ('Vanessa Abrams', 2, 'Principal', 4, 'Popular'),
                            ('Lily van der Woodsen', 7, 'Principal', 9, 'Popular'),
                            ('Rufus Humphrey', 5, 'Principal', 3, 'Popular'),
                            ('Ivy Dickens', 9, 'Principal', 4, 'Popular'),
                            ('Georgina Sparks', 8, 'Secundário', 6, 'Loser'),
                            ('Eleanor Waldorf-Rose', 5, 'Secundário', 9, 'Loser'),
                            ('Eric van der Woodsen', 3, 'Secundário', 6, 'Loser'),
                            ( 'The Captain', 6, 'Secundário', 4, 'Loser'),
                            ('Dorota Kishlovsky', 6, 'Secundário', 9, 'Loser'),
                            ('Bart Bass', 7, 'Secundário', 8, 'Loser'),
                            ('Carter Baizen', 4, 'Secundário', 5, 'Loser'),
                            ('CeCe Rhodes', 8, 'Secundário', 6, 'Loser'),
                            ('Jack Bass', 9, 'Secundário', 4, 'Loser');
                            