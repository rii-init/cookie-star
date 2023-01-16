/************
 *
 *   Component
 *
 *   
 *   Predefined components of entities in the universe.
 *
 ************/

 CREATE TABLE component(
        component_id SERIAL PRIMARY KEY,
        name         VARCHAR(255) NOT NULL,
        description      TEXT,
        content      LONGTEXT,
        created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at   TIMESTAMP NOT NULL DEFAULT NOW()
    );