/************
 *
 *   Voxel
 *
 *   This table stores a portion of the data for the universe.
 *   content is a JSON string that contains entities and meta data.
 *
 ************/

CREATE TABLE voxel (
    id SERIAL PRIMARY KEY,
    x INT NOT NULL,
    y INT NOT NULL,
    z INT NOT NULL,
    content longtext NOT NULL,
);